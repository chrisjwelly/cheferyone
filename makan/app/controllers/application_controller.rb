class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    DEFAULT_OFFSET = 0
    DEFAULT_LIMIT = 10

    def set_offset_and_limit
      @offset = params[:offset] || DEFAULT_OFFSET
      @limit = params[:limit] || DEFAULT_LIMIT
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up,
        keys: [:username, :email, :password, :password_confirmation])
      devise_parameter_sanitizer.permit(:sign_in,
        keys: [:login, :password])
      devise_parameter_sanitizer.permit(:account_update,
        keys: [:username, :name, :email, :password_confirmation, :current_password])
    end
end
