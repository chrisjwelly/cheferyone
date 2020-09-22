class Users::RegistrationsController < Devise::RegistrationsController
  before_action :ensure_params_exist, only: :create
  acts_as_token_authentication_handler_for User, except: [:create]

  # Create an account
  def create
    user = User.new user_params
    if user.save
      render json: user.as_json.merge({
        authentication_token: user.authentication_token
      }), status: :ok
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  # Delete account
  def destroy
    # Placeholder
  end

  # Update account
  def update
    # Placeholder
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end

  def ensure_params_exist
    return if params[:user].present?
    render json: {
        messages: "Missing Params",
        is_success: false,
        data: {}
      }, status: :bad_request
  end
end
