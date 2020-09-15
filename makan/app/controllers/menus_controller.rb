class MenusController < ApplicationController
  before_action :set_menu, only: [:show, :update, :destroy]
  acts_as_token_authentication_handler_for User

  DEFAULT_OFFSET = 0
  DEFAULT_LIMIT = 10

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

  # POST /menus
  def create
    @menu = current_user.restaurant.menus.create(menu_params)

    if @menu.save
      render json: @menu, status: :created, location: @menu
    else
      # Status code: 422
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /menus/1
  def update
    if @menu.update(menu_params)
      render json: @menu
    else
      # Status code: 422
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  # DELETE /menus/1
  def destroy
    @menu.destroy
    render body: nil, status: :no_content
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
