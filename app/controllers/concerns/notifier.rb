module Notifier
  def notify(recipient, notifiable, content, image_url, redirect_url)
    Notification.create(
      recipient: recipient,
      notifiable: notifiable,
      content: content,
      image_url: image_url,
      redirect_url: redirect_url
    )
  end
end