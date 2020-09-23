class ReviewsController < ApplicationController
  acts_as_token_authentication_handler_for User
  before_action :set_order, only: [:show, :update, :destroy, :create]
  before_action :set_review, only: [:show, :update, :destroy]

  # GET /orders/<id>/review
  def show
    render json: @review
  end

  # POST /orders/<id>/review
  def create
    if @order.status != :completed.to_s
      # We can only give review for Orders which are completed
      render body: nil, status: :unprocessable_entity
      return
    end

    @review = @order.build_review(review_params)

    if @review.save
      render json: @review, status: :created
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/<id>/review/
  def update
    if @review.update(review_params)
      render json: @review
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /orders/<id>/review
  def destroy
    @review.destroy
    render body: nil, status: :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = @order.review

      if @review.nil?
        render body: nil, status: :not_found
      end
    end

    def set_order
      @order = current_user.orders.find(params[:id])
    rescue
      # Cannot find the orders in the current_user
      # Probably accessing someone else's or order doesn't even exist
      render body: nil, status: :forbidden
    end

    # Only allow a trusted parameter "white list" through.
    def review_params
      params.require(:review).permit(:rating, :content)
    end
end
