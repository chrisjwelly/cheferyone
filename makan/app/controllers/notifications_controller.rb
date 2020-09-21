class NotificationsController < ApplicationController
  acts_as_token_authentication_handler_for User
  before_action :set_offset_and_limit, only: [:index]

  #GET /notifications
  def index
    @notifications = Notification.where(recipient: current_user).limit(@limit).offset(@offset)
    render json: @notifications
  end

  # Unused at the moment
  def mark_as_read
    @notifications = Notification.where(recipient: current_user).unread
    @notifications.update_all(read_at: Time.zone.now)
    render json: {message: "notifications read", status: :ok}
  end
end