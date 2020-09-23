class YourRestaurant::OrdersController < YourRestaurant::ApplicationController
  acts_as_token_authentication_handler_for User
  before_action :set_order, only: [:show, :update_status]

  before_action :ensure_chef!

  # GET /your_restaurant/orders
  def index
    @orders = current_user.restaurant.orders.where.not(status: Order.statuses[:unpaid])
    render json: @orders
  end

  # GET /your_restaurant/orders/1
  def show
    render json: @order
  end

  # PATCH/PUT /your_restaurant/orders/1/update_status
  def update_status
    if !is_valid_status_change?
      render body: nil, status: :unprocessable_entity
    elsif @order.update(update_status_params)
      render json: @order
    else
      render json: { errors: @order.errors }, status: :unprocessable_entity
    end
  end

  # A little lazy to come up with an abstracted version..
  # Keeping it separate in case we need a different logic for it
  def paid
    @orders = current_user.restaurant.orders.where(status: Order.statuses[:paid])
    render json: @orders
  end
  
  def confirmed
    @orders = current_user.restaurant.orders.where(status: Order.statuses[:confirmed])
    render json: @orders
  end
  
  def completed
    @orders = current_user.restaurant.orders.where(status: Order.statuses[:completed])
    render json: @orders
  end

  def ended
    @orders = current_user.restaurant.orders.where(status: Order.statuses[:ended])
    render json: @orders
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = current_user.restaurant.orders.find(params[:id])
    rescue
      # Cannot find the orders in the current_user
      # Probably accessing someone else's or order doesn't even exist
      render body: nil, status: :forbidden
    end

    def is_valid_status_change?
      curr_status = @order.status
      target_status = update_status_params.require(:status)

      # Ideally, this should be in the class level. Couldn't figure it out yet :<
      # Key-Value represents from-to in the state transition

      # Restaurants shouldn't be able to change from unpaid to paid, but can perform the other transitions
      valid_status_transitions = {
        unpaid:[], paid:["ended", "confirmed"], confirmed:["completed"], completed:[], ended:[]
      }

      valid_target_statuses = valid_status_transitions[curr_status.to_sym]
      valid_target_statuses.include? target_status
    end

    # Only allow a trusted parameter "white list" through.
    def update_status_params
      # Only permit status, because a restaurant chef can only change the status
      params.require(:order).permit(:status) 
    end

end
