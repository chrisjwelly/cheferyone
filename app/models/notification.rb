class Notification < ApplicationRecord
  default_scope { order('created_at DESC') }

  belongs_to :recipient, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  after_commit -> { NotificationRelayJob.perform_later(self) }
  scope :unread, -> {where(read_at: nil)}

  def as_json(options = {})
    super(options).merge({
      "object" => {
        image_url: image_url,
        redirect_url: redirect_url,
        created_at: created_at
      }
    })
  end
end
