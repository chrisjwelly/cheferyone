class YourRestaurant::ApplicationController < ApplicationController
  # before_action :authenticate
  # IMPORTANT: This is not working yet. I might need some help here.
  private
    def authenticate
      render json: {
        error: "You need to sign in or sign up before continuing"
      }, status: :unauthorized if current_user.nil?
    end

    def ensure_chef!
      raise ActionController::RoutingError.new('Not Found') unless !current_user.nil? && current_user.chef?
    rescue
      render json: {
        error: "You have to register your-restaurant before accessing those endpoints"
      }, status: :forbidden
    end
end
