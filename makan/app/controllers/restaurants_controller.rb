class RestaurantsController < ApplicationController
  acts_as_token_authentication_handler_for User
  before_action :set_restaurant, only: [:show, :update, :destroy]
  before_action :ensure_chef!, only: [:show, :update, :destroy]

  # POST /your_restaurant
  def create
    # Validation: user do not have a restaurant before
    if !current_user.restaurant.nil?
      render json: {
        error: "You need to delete your restaurant before creating another one"
      }, status: :unauthorized

      return
    end

    @restaurant = current_user.build_restaurant(restaurant_params)
    if @restaurant.save
      render json: @restaurant, status: :created
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  # GET /your_restaurant
  def show
    render json: @restaurant
  end

  # PATCH/PUT /your_restaurant
  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /your_restaurant
  def destroy
    if @restaurant.destroy
      render json: {
        message: "Restaurant destroyed succesfully"
      }, status: :ok
    else
      render json: {
        error: "Something went wrong"
      }, status: :internal_server_error
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant
      @restaurant = current_user.restaurant
    end

    # Only allow a trusted parameter "white list" through.
    def restaurant_params
      params.require(:restaurant).permit(:description, :location, :logo)
    end

    def ensure_chef!
      raise ActionController::RoutingError.new('Not Found') unless !current_user.nil? && current_user.chef?
    rescue
      render json: {
        error: "You need to create your-restaurant before accessing those endpoints"
      }, status: :unauthorized
    end
end
