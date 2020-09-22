class MenusController < ApplicationController
  acts_as_token_authentication_handler_for User, only: [:belongs, :recommended, :subscribe, :unsubscribe]
  before_action :ensure_chef!, only: [:belongs]
  before_action :set_menu, only: [:show, :belongs, :reviews]
  before_action :set_offset_and_limit, only: [:filter, :search, :recommended, :near_you, :recent, :index, :reviews]

  # GET /menus/filter?tags=params
  def filter
    list_of_tags = params[:tags].split(',')
    @menus = Menu.joins(:tags).where(tags: { name: list_of_tags }).distinct
        .limit(@limit).offset(@offset)
    render json: @menus
  end

  # GET /menus/search?query=params
  def search
    word = params[:query]
    data = Menu.search(word, {hitsPerPage: @limit, page: (@offset.to_f/@limit.to_f).ceil}).raw_answer
   
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

  # GET /menus/1/reviews
  def reviews
    @reviews = @menu.reviews.limit(@limit).offset(@offset)
    render json: @reviews
  end

  # POST /menus/1/subscribe
  def subscribe
    @menu = Menu.find(params[:id])
    if Subscription.exists?(user: current_user, subscribable: @menu)
      render json: {
        message: "Menu has been subscribed"
      }, status: :unprocessable_entity
    else
      @subscription = Subscription.create(user: current_user, subscribable: @menu)
      if @subscription.save
        render json: {
          message: "Menu subscribed succesfully"
        }, status: :ok
      else
        render json: {
          errors: @subscription.errors
        }, status: :unprocessable_entity
      end
    end
  end

  # POST /menus/1/unsubscribe
  def unsubscribe
    @menu = Menu.find(params[:id])
    if !Subscription.exists?(user: current_user, subscribable: @menu)
      render json: {
        message: "Menu has not been subscribed"
      }, status: :unprocessable_entity
    else
      if Subscription.where(user: current_user, subscribable: @menu).first.destroy
        render json: {
          message: "Menu unsubscribed successfully"
        }, status: :ok
      else
        render json: {
          message: "Something went wrong"
        }, status: :unprocessable_entity
      end
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

    def ensure_chef!
      raise ActionController::RoutingError.new('Not Found') unless !current_user.nil? && current_user.chef?
    rescue
      render json: {
        error: "You have to register your-restaurant before accessing those endpoints"
      }, status: :forbidden
    end
end
