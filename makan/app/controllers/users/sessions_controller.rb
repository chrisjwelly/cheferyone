class Users::SessionsController < Devise::SessionsController
  before_action :sign_in_params, only: :create
  before_action :load_user, only: :create

  acts_as_token_authentication_handler_for User, except: [:create]

  # Devise checks for signed in user differently with simple token authentication
  # Therefore we skip it
  skip_before_action :verify_signed_out_user

  # sign in
  def create
    if @user.valid_password?(sign_in_params[:password])
      sign_in "user", @user
      render json: {
        messages: "Signed In Successfully",
        is_success: true,
        data: {user: @user}
      }, status: :ok
    else
      render json: {
        messages: "Signed In Failed - Unauthorized",
        is_success: false,
        data: {}
      }, status: :unauthorized
    end
  end

  # sign out
  def destroy
    # The first if should be unnecessary due to the fact that
    # this controller is an authentication handler.
    #
    # Nonetheless, there is an issue if we don't implement this.
    # As a result, we keep it for now
    if current_user.nil?
      render json: {
        error: "You need to sign in or sign up before continuing"
      }, status: :unauthorized
    else
      # Force changing the authentication token
      current_user.authentication_token = nil
      current_user.save

      render json: {
        messages: "Signed Out Successfully",
        is_success: true,
        data: {}
      }, status: :ok
    end
  end

  private
  def sign_in_params
    params.require(:user).permit(
    :password,
    :login
  )
  end

  def load_user
    @user = User.find_for_database_authentication(login: sign_in_params[:login])
    if @user
      return @user
    else
      render json: {
        messages: "Cannot get User",
        is_success: false,
        data: {}
      }, status: :unauthorized
    end
  end
end
