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
    @menu = current_user.restaurant.menus.create(menu_params)

    if @menu.save
      is_create_success = create_preorders?
      if (!is_create_success)
        return
      end

      render json: @menu, status: :created, location: @menu
    else
      # Status code: 422
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /your_restaurant/menus/1
  def update
    if @menu.update(menu_params)
      is_create_success = create_preorders?
      if (!is_create_success)
        return
      end

      is_update_success = update_preorders?
      if (!is_update_success)
        return
      end

      is_destroy_success = destroy_preorders? # This should always be true but it's here for consistency
      if (!is_destroy_success)
        return
      end

      render json: @menu
    else
      # Status code: 422
      render json: @menu.errors, status: :unprocessable_entity
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
      params.require(:menu).permit(:name, :price, :description, :image_url)
    end

    # ----- START OF Creating preorders -----
    def get_new_preorders
      params.require(:menu).delete(:new_preorders)
    end

    def permitted_create_preorder_params(preorder_params)
      preorder_params.permit(:start_date, :end_date, :collection_date, :quota)
    end

    # Returns boolean to indicate the success
    def create_preorders?
      get_new_preorders.each { |unpermitted_params|
        permitted_params = permitted_create_preorder_params(unpermitted_params)
        @preorder = @menu.preorders.create(permitted_params)

        if @preorder.save
          # If successful, no need to give response
        else
          # Status code: 422
          render json: @preorder.errors, status: :unprocessable_entity and return false
        end
      }

      return true
    end
    # ----- END OF Creating preorders -----

    # ----- START OF Updating preorders -----
    def get_edited_preorders
      params.require(:menu).delete(:edited_preorders)
    end

    def permitted_update_preorder_params(preorder_params)
      preorder_params.permit(:id, :start_date, :end_date, :collection_date, :quota)
    end

    # Returns boolean to indicate the success
    def update_preorders?
      get_edited_preorders.each { |unpermitted_params|
        permitted_params = permitted_update_preorder_params(unpermitted_params)
        @preorder = @menu.preorders.find(permitted_params[:id])
        if @preorder.update(permitted_params)
          # If successful, no need to give response
        else
          # Status code: 422
          render json: @preorder.errors, status: :unprocessable_entity and return false
        end
      }

      return true
    end
    # ----- END OF Updating preorders -----

    # ----- START OF Deleting preorders -----
    def get_deleted_preorders
      params.require(:menu).delete(:deleted_preorders)
    end

    # Returns boolean to indicate the success
    def destroy_preorders?
      get_deleted_preorders.each { |id|
        @preorder = @menu.preorders.find(id)
        @preorder.destroy
      }

      return true
    end
    # ----- END OF Deleting preorders -----
end
