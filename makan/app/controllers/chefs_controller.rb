class ChefsController < ApplicationController
  DEFAULT_OFFSET = 0
  DEFAULT_LIMIT = 10

  # GET /chefs
  def index
    offset = params[:offset] || DEFAULT_OFFSET
    limit = params[:limit] || DEFAULT_LIMIT

    @chefs = all_chef.limit(limit).offset(offset)
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

  private
    def all_chef
      # This will still return users but filtering out those who
      # do not have associations with restaurants by using INNER JOIN.
      User.joins(:restaurant)
    end
end
