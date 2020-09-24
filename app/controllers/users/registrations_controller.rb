class Users::RegistrationsController < Devise::RegistrationsController
  before_action :ensure_params_exist, only: [:create, :update]

  # Skip the default authentication from devise
  skip_before_action :authenticate_scope!, only: [:update, :destroy]

  # We're using this authentication instead
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

  # Get current account information
  def index
    if current_user.nil?
      render body: nil, status: :unauthorized
      return
    end

    render json: current_user, status: :ok
  end

  # Delete account
  def destroy
    if current_user.nil?
      render body: nil, status: :unauthorized
      return
    end

    current_user.destroy
    render body: nil, status: :no_content
  end

  # Update account
  def update
    if current_user.nil?
      render body: nil, status: :unauthorized
      return
    end

    new_params = update_params.merge({ authentication_token: nil })
    if current_user.update(new_params)
      render json: current_user.as_json.merge({
        authentication_token: current_user.authentication_token
      }), status: :ok
    else
      render json: { errors: current_user.errors }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end

  def update_params
    params.require(:user).permit(:username, :password, :password_confirmation)
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
