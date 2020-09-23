class YourRestaurant::MenusController < YourRestaurant::ApplicationController
  acts_as_token_authentication_handler_for User

  before_action :ensure_chef!
  before_action :set_offset_and_limit, only: :index
  before_action :set_menu, only: [:show, :update, :destroy]

  # GET /your_restaurant/menus
  def index
    @menus = current_user.restaurant.menus.limit(@limit).offset(@offset)
    render json: @menus
  end

  # GET /your_restaurant/menus/1
  def show
    # This show action looks for menu that belongs to you
    render json: @menu
  end

  # POST /your_restaurant/menus
  def create
    @menu = current_user.restaurant.menus.build(menu_params)
    is_success = true
    ActiveRecord::Base.transaction do
      if !@menu.save
        # Status code: 422
        is_success = false
        render json: { errors: @menu.errors }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      if !create_preorders?
        is_success = false
        raise ActiveRecord::Rollback
      end

      render json: @menu, status: :created
    end

    return unless is_success

    # Notifications
    @subscriptions = Subscription.where(subscribable: current_user.restaurant)
    @subscriptions.each do |subscription|
      Notification.create(recipient: subscription.user, notifiable: @menu, content: "A new menu is available. Let's check!")
    end
  end

  # PATCH/PUT /your_restaurant/menus/1
  def update
    ActiveRecord::Base.transaction do
      if !@menu.update(menu_params)
        # Status code: 422
        render json: { errors: @menu.errors }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      raise ActiveRecord::Rollback unless create_preorders?
      raise ActiveRecord::Rollback unless update_preorders?
      raise ActiveRecord::Rollback unless destroy_preorders?

      render json: @menu, status: :ok
    end
  end

  # DELETE /your_restaurant/menus/1
  def destroy
    @menu.destroy
    render body: nil, status: :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu
      @menu = current_user.restaurant.menus.find(params[:id])
    rescue
      # If the menu is not part of the current_user.restaurant.menus, then we don't have access
      # ActiveRecord will throw an exception so we will rescue it immediately
      render body: nil, status: :forbidden
    end

    # Only allow a trusted parameter "white list" through.
    def menu_params
      params.require(:menu).permit(:name, :price, :description, :image_url, tags: [])
        .tap do |params|
          params[:tags] = Tag.where(name: params[:tags]) unless params[:tags].nil?
        end
    end

    # ----- START OF Creating preorders -----
    def get_new_preorders
      params.require(:menu).delete(:new_preorders) || []
    end

    def permitted_create_preorder_params(preorder_params)
      preorder_params.permit(:start_date, :end_date, :collection_date, :quota)
    end

    # Returns boolean to indicate the success
    def create_preorders?
      get_new_preorders.each { |unpermitted_params|
        permitted_params = permitted_create_preorder_params(unpermitted_params)
        @preorder = @menu.preorders.build(permitted_params)
        if @preorder.save
          # If successful, no need to give response
        else
          # Status code: 422
          render json: { errors: @preorder.errors }, status: :unprocessable_entity
          return false
        end
      }

      return true
    end
    # ----- END OF Creating preorders -----

    # ----- START OF Updating preorders -----
    def get_edited_preorders
      params.require(:menu).delete(:edited_preorders) || []
    end

    def permitted_update_preorder_params(preorder_params)
      preorder_params.permit(:id, :start_date, :end_date, :collection_date, :quota)
    end

    # Returns boolean to indicate the success
    def update_preorders?
      get_edited_preorders.each { |unpermitted_params|
        permitted_params = permitted_update_preorder_params(unpermitted_params)
        @preorder = @menu.preorders.find_by_id(permitted_params[:id])
        render body: nil, status: :not_found and return false if @preorder.nil?

        if @preorder.has_started?
          render json: { error: "You cannot update a preorder that has started!" }, status: :unprocessable_entity
          return false
        end

        if @preorder.update(permitted_params)
          # If successful, no need to give response
        else
          # Status code: 422
          render json: { errors: @preorder.errors }, status: :unprocessable_entity
          return false
        end
      }

      return true
    end
    # ----- END OF Updating preorders -----

    # ----- START OF Deleting preorders -----
    def get_deleted_preorders
      params.require(:menu).delete(:deleted_preorders) || []
    end

    # Returns boolean to indicate the success
    def destroy_preorders?
      get_deleted_preorders.each { |id|
        @preorder = @menu.preorders.find_by_id(id)
        render body: nil, status: :not_found and return false if @preorder.nil?

        if @preorder.has_started?
          render json: { error: "You cannot delete a preorder that has started!" }, status: :unprocessable_entity
          return false
        end

        @preorder.destroy
      }
      return true
    end
    # ----- END OF Deleting preorders -----
end
