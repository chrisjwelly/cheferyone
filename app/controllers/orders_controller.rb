class OrdersController < ApplicationController
  acts_as_token_authentication_handler_for User
  before_action :set_order, only: [:show, :update, :destroy, :update_status]

  # GET /orders
  def index
    @orders = current_user.orders.where.not(status: Order.statuses[:unpaid])
    grouped_orders_by_transaction_id = group_by_transaction_id

    grouped_orders = group_internals_by_restaurant_name(grouped_orders_by_transaction_id)

    render json: grouped_orders
  end

  # GET /orders/all
  def all
    @orders = current_user.orders.all

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = current_user
      .orders
      .build(create_order_params.merge({ status: Order.statuses[:unpaid] }))

    if @order.save
      menu = Menu.where(id: Preorder.where(id: @order.preorder_id).first.menu_id).first
      message = "Sweet! #{current_user.username} has ordered for #{menu.name}"
      recipient = User.where(id: Restaurant.where(id: menu.restaurant_id).first.user_id).first
      notify(recipient, order, menu)
      render json: @order, status: :created, location: @order
    else
      render json: { errors: @order.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    # After the unpaid state, you shouldn't be able to change order's quantity or remarks
    if Order.statuses[:unpaid] != Order.statuses[@order.status]
      render body: nil, status: :unprocessable_entity
    elsif @order.update(update_order_params)
      render json: @order
    else
      render json: { errors: @order.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1/update_status
  def update_status
    if !is_valid_status_change?
      render body: nil, status: :unprocessable_entity
    elsif @order.update(update_status_params)
      menu = Menu.where(id: Preorder.where(id: @order.preorder_id).first.menu_id).first
      message = "Too bad! #{current_user.username} has cancelled an order for #{menu.name}"
      recipient = User.where(id: Restaurant.where(id: menu.restaurant_id).first.user_id).first
      notify(recipient, order, menu)
      render json: @order
    else
      render json: { errors: @order.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    if Order.statuses[:unpaid] != Order.statuses[@order.status]
      render body: nil, status: :unprocessable_entity
    else
      @order.destroy
      render body: nil, status: :no_content
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = current_user.orders.find(params[:id])
    rescue
      # Cannot find the orders in the current_user
      # Probably accessing someone else's or order doesn't even exist
      render body: nil, status: :forbidden
    end

    # Returns a Hash, whose keys are the transaction_ids, and the value is an
    # an array of Order objects which has that transaction_id
    def group_by_transaction_id
      grouped_orders = {}
      
      reverse_sorted_orders = @orders.order(:transaction_id).reverse_order
      reverse_sorted_orders.each do |order|
        t_id = order.transaction_id

        if grouped_orders.has_key? t_id
          grouped_orders[t_id] << order
        else
          grouped_orders.store(t_id, [order])
        end
      end

      grouped_orders
    end

    def is_valid_status_change?
      curr_status = @order.status
      target_status = update_status_params.require(:status)

      # Ideally, this should be in the class level. Couldn't figure it out yet :<
      # Key-Value represents from-to in the state transition

      # User can only change from paid to ended
      # The unpaid -> paid transition is handled by cart/pay
      valid_status_transitions = {
        unpaid:[], paid:["ended"], confirmed:[], completed:[], ended:[]
      }

      valid_target_statuses = valid_status_transitions[curr_status.to_sym]
      valid_target_statuses.include? target_status
    end

    def group_internals_by_restaurant_name(grouped_orders_by_transaction_id)
      grouped_orders = {}
      grouped_orders_by_transaction_id.each do |key, arr|
        converted = group_by_restaurant_name(arr)
        grouped_orders.store(key, converted)
      end

      grouped_orders
    end

    def group_by_restaurant_name(orders_arr)
      grouped_orders = {}

      orders_arr.each do |order|
        chef_name = order.restaurant.user.username

        if grouped_orders.has_key? chef_name
          grouped_orders[chef_name] << order
        else
          grouped_orders.store(chef_name, [order])
        end
      end

      grouped_orders
    end

    # Only allow a trusted parameter "white list" through.
    def update_order_params
      params.require(:order).permit(:quantity, :remarks)
    end

    def create_order_params
      # Don't permit status. By default it is unpaid
      params.require(:order).permit(:quantity, :remarks, :preorder_id)
    end

    def update_status_params
      params.require(:order).permit(:status)
    end
end
