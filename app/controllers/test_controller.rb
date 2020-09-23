class TestController < ApplicationController
  acts_as_token_authentication_handler_for User, only: [:authenticated]

  def index
    render json: {:content => 'Hello World'}, status: 200
  end

  # Can only be accessed if authenticity token is found
  def authenticated
    render json: {:messages => 'You are authenticated!'}, status: 200
  end
end
