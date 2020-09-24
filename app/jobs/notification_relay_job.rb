class NotificationRelayJob < ApplicationJob
  queue_as :default

  def perform(notification)
    ActionCable.server.broadcast "notifications:#{notification.recipient_id}", {
      content: notification.content,
      object: {
        image_url: notification.image_url,
        redirect_url: notification.redirect_url,
        created_at: notification.created_at
      },
      to: notification.recipient
    }
  end
end
