class NotificationRelayJob < ApplicationJob
  queue_as :default

  def perform(notification)
    ActionCable.server.broadcast "notifications:#{notification.recipient_id}", {content: notification.content, object: notification.notifiable, to: notification.recipient}
  end
end
