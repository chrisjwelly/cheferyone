class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    user = User.from_google(from_google_params)

    if user.present?
      render json: user, status: :ok
    else
      render json: {message: "#{auth.info.email} is not authorized."}, status: :unprocessable_entity
    end
  end

  def failure
    render body: nil, status: :unauthorized
  end

  private

  def from_google_params
    @from_google_params ||= {
      email: auth.info.email
    }
  end

  def auth
    @auth ||= request.env['omniauth.auth']
  end
end