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
      render json: @menu, status: :created, location: @menu
    else
      # Status code: 422
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /your_restaurant/menus/1
  def update
    if @menu.update(menu_params)
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
end
