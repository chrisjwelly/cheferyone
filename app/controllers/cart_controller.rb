class CartController < ApplicationController
  acts_as_token_authentication_handler_for User
  include Notifier
  # GET /cart
  def show 
    @unpaid_orders = group_by_restaurant_name
    render json: @unpaid_orders
  end

  # POST /pay
  def pay
    now = DateTime.now
    max_tid = current_user.orders.where.not(status: Order.statuses[:unpaid]).maximum(:transaction_id)
    new_tid = 0
    if max_tid.nil?
      # Start counting up from 1
      new_tid = 1
    else
      new_tid = max_tid + 1
    end

    orders = current_user.orders.unpaid
    # TODO: Stripe Integrations
    orders.each do |order|
      # TODO: Do a Transaction for rollback
      if !order.update(status: Order.statuses[:paid], transaction_id: new_tid, paid_date: now)
        render json: { errors: @order.errors }, status: :unprocessable_entity
      end
    end

    # Notify the home chefs that someone has just make the order
    orders.each do |order|
      menu = order.menu
      message = "Sweet! #{current_user.username} has paid an order for #{menu.name}"
      recipient = menu.restaurant.user
      image_url = menu.image_url
      redirect_url = "/your-restaurant/orders"

      notify(recipient, order, message, image_url, redirect_url)
    end

    render body: nil, status: :ok
  end

  private
    # Returns a Hash, whose keys are the transaction_ids, and the value is an
    # an array of Order objects which has that transaction_id
    def group_by_restaurant_name
      grouped_orders = {}
      
      current_user.orders.unpaid.each do |order|
        if !order.preorder.has_ended?
          chef_name = order.restaurant.user.username

          if grouped_orders.has_key? chef_name
            grouped_orders[chef_name] << order
          else
            grouped_orders.store(chef_name, [order])
          end
        end
      end

      grouped_orders
    end
end

