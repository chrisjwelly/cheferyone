class ChefsController < ApplicationController
  acts_as_token_authentication_handler_for User, only: [:subscribe, :unsubscribe, :is_subscribed]
  before_action :set_offset_and_limit, only: [:filter, :search, :index]
  before_action :set_chef, only: [:show, :subscribe, :unsubscribe, :is_subscribed]

  # GET /chefs/filter?tags=params
  def filter
    list_of_tags = params[:tags].split(',')
    @chefs = User.joins(:restaurant => :tags).where(restaurant: {tags: { name: list_of_tags }})
        .distinct.limit(@limit).offset(@offset)
    render json: @chefs
  end

  # GET /chefs/search?query=params
  def search
    word = params[:query]
    data =  User.search(word, {hitsPerPage: @limit, page: (@offset.to_f/@limit.to_f).ceil}).raw_answer
    @chefs = data['hits']
    render json: @chefs
  end

  # GET /chefs
  def index
    @chefs = all_chef.limit(@limit).offset(@offset)
    render json: @chefs
  end

  # GET /chefs/username1
  def show
    render json: @chef
  end

  # POST /chefs/username1/subscribe
  def subscribe
    if Subscription.exists?(user: current_user, subscribable: @chef.restaurant)
      render json: {
        message: "Restaurant/chef has been subscribed"
      }, status: :unprocessable_entity
    else
      @subscription = Subscription.create(user: current_user, subscribable: @chef.restaurant)

      if @subscription.save
        render json: {
          message: "Restaurant/chef subscribed succesfully"
        }, status: :ok
      else
        render json: {
          errors: @subscription.errors
        }, status: :unprocessable_entity
      end
    end
  end

  # POST /chefs/username1/unsubscribe
  def unsubscribe
    if !Subscription.exists?(user: current_user, subscribable: @chef.restaurant)
      render json: {
        message: "Restaurant/chef has not been subscribed"
      }, status: :unprocessable_entity
    else
      if Subscription.where(user: current_user, subscribable: @chef.restaurant).first.destroy
        render json: {
          message: "Restaurant/chef unsubscribed successfully"
        }, status: :ok
      else
        render json: {
          message: "Something went wrong"
        }, status: :unprocessable_entity
      end
    end
  end

  # GET /menus/1/is_subscribed
  def is_subscribed
    render json: {
      is_subscribed: Subscription.exists?(user: current_user, subscribable: @chef.restaurant)
    }, status: :ok
  end

  private
    def all_chef
      # This will still return users but filtering out those who
      # do not have associations with restaurants by using INNER JOIN.
      User.joins(:restaurant)
    end

    def set_chef
      @chef = User.find_by(username: params[:username])
      not_found if @chef.nil? || !@chef.chef?
    end
end
