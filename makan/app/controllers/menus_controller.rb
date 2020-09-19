class MenusController < ApplicationController
  acts_as_token_authentication_handler_for User, except: [:show, :recent, :index]
  before_action :set_menu, only: [:show, :belongs]
  before_action :set_offset_and_limit, only: [:recommended, :near_you, :recent, :index]

  # GET /menus/search?query=Menu
  def search
    word = params[:query]
    data = Menu.search(word).raw_answer
    @menus = data['hits']
    render json: @menus
  end

  # GET /menus/recommended
  def recommended
    @menus = Menu.limit(@limit).offset(@offset)
    render json: @menus
  end

  # GET /menus/near_you
  def near_you
    @menus = Menu.limit(@limit).offset(@offset)
    render json: @menus
  end

  # GET /menus/recent
  def recent
    @menus = Menu.limit(@limit).offset(@offset)
    render json: @menus
  end

  # GET /menus
  def index
    @menus = Menu.limit(@limit).offset(@offset)
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
      params.require(:menu).permit(:name, :price, :description, :image_url)
    end
end
