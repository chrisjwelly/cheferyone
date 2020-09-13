class MenusController < ApplicationController
  acts_as_token_authentication_handler_for User

  DEFAULT_OFFSET = 0
  DEFAULT_LIMIT = 10
  def recommended
    offset = params[:recommended] || DEFAULT_OFFSET
    limit = params[:limit] || DEFAULT_LIMIT

    menus = Menu.limit(limit).offset(offset)
    render json: menus, status: 200
  end
end
