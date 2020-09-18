class MenusController < ApplicationController
  before_action :set_menu, only: [:show, :belongs]
  acts_as_token_authentication_handler_for User, except: [:show, :recent, :index]

  DEFAULT_OFFSET = 0
  DEFAULT_LIMIT = 10

  # GET /menus/search?query=Menu
  def search
    word = params[:query]
    data = Menu.search(word).raw_answer
    @menus = data['hits']
    render json: @menus
  end

  # GET /menus/recommended
  def recommended
    offset = params[:offset] || DEFAULT_OFFSET
    limit = params[:limit] || DEFAULT_LIMIT

    @menus = Menu.limit(limit).offset(offset)
    render json: @menus
  end

  # GET /menus/near_you
  def near_you
    offset = params[:offset] || DEFAULT_OFFSET
    limit = params[:limit] || DEFAULT_LIMIT

    @menus = Menu.limit(limit).offset(offset)
    render json: @menus
  end

  # GET /menus/recent
  def recent
    offset = params[:offset] || DEFAULT_OFFSET
    limit = params[:limit] || DEFAULT_LIMIT

    @menus = Menu.limit(limit).offset(offset)
    render json: @menus
  end

  # GET /menus
  def index
    @menus = Menu.all

    render json: @menus
  end

  # GET /menus/1
  def show
    render json: @menu
  end

  # GET /menus/1/belongs
  def belongs
    if current_user.restaurant.id == @menu.restaurant_id
      # 200 OK
      render body: nil, status: :ok
    else
      # 403 Forbidden
      render body: nil, status: :forbidden
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu
      @menu = Menu.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def menu_params
      params.require(:menu).permit(:name, :price, :description)
    end
end
