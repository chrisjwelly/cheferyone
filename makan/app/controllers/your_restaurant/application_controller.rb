class YourRestaurant::ApplicationController < ApplicationController
  # before_action :authenticate
  # IMPORTANT: This is not working yet. I might need some help here.

  private
    def authenticate
      render json: {
        error: "You need to sign in or sign up before continuing"
      }, status: :unauthorized if current_user.nil?
    end
end
