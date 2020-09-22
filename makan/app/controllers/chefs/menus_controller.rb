class Chefs::MenusController < ApplicationController
  before_action :set_offset_and_limit, only: :index
  before_action :set_chef

  # GET /chefs/username1/menus?limit=&offset=
  def index
    @menus = @chef.menus.limit(@limit).offset(@offset)
    render json: @menus
  end

  # GET /chefs/username1/menus/1
  def show
    @menu = @chef.menus.find_by(id: params[:id])
    not_found && return if @menu.nil?

    render json: @menu
  end

  private
    def set_chef
      @chef = User.find_by(username: params[:chef_username])
      not_found if @chef.nil? || !@chef.chef?
    end
end
