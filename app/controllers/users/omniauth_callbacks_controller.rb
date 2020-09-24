class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    email = auth.info.email
    user = User.find_by(email: email)
    is_new = user.nil?

    # Try creating one if not yet exist
    if is_new
      user = User.create(
        username: "#{email[/^[^@]+/]}_#{SecureRandom.hex(3)}",
        password: SecureRandom.hex(10),
        email: email
      )
    end

    if user.present?
      render json: user.as_json.merge({
        authentication_token: user.authentication_token,
        is_new: is_new
      }), status: :ok
    else
      render json: { message: "#{email} is not authorized." }, status: :unprocessable_entity
    end
  end

  def failure
    render body: nil, status: :unauthorized
  end

  private
    def auth
      @auth ||= request.env['omniauth.auth']
    end
end
