module Notifier
  def notify(recipient, notifiable, content)
    Notification.create(recipient: recipient, notifiable: notifiable, content: content)
  end
end