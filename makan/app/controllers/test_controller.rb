class TestController < ApplicationController
  def index
    render json: {:content => 'Hello World'}, status: 200
  end
end
