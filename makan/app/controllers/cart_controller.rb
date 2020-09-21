class CartController < ApplicationController
  acts_as_token_authentication_handler_for User
  # GET /cart
  def show 
    @unpaid_orders = current_user.orders.unpaid
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

    # TODO: Stripe Integrations
    current_user.orders.unpaid.each do |order|
      # TODO: Do a Transaction for rollback
      if !order.update(status: Order.statuses[:paid], transaction_id: new_tid, paid_date: now)
        render json: { errors: @order.errors }, status: :unprocessable_entity
      end
    end
    render body: nil, status: :ok
  end
end

