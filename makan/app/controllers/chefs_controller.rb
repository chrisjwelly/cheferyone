class ChefsController < ApplicationController
  acts_as_token_authentication_handler_for User
  before_action :set_offset_and_limit, only: [:index]

  # GET /chefs
  def index
    @chefs = all_chef.limit(@limit).offset(@offset)
    render json: @chefs
  end

  # GET /chefs/1
  def show
    @chef = all_chef.find(params[:id])
    if @chef.nil?
      render json: nil, status: :not_found
    else
      render json: @chef, status: :ok
    end
  end

  # POST /chefs/1/subscribe
  def subscribe
    @chef = all_chef.find(params[:id])
    if @chef.nil?
      render json: nil, status: :not_found
    else
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
  end

  # POST /chefs/1/unsubscribe
  def unsubscribe
    @chef = all_chef.find(params[:id])
    if @chef.nil?
      render json: nil, status: :not_found
    else
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
  end

  private
    def all_chef
      # This will still return users but filtering out those who
      # do not have associations with restaurants by using INNER JOIN.
      User.joins(:restaurant)
    end
end
