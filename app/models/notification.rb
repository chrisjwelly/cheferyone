class Notification < ApplicationRecord
	belongs_to :recipient, class_name: "User"
	belongs_to :notifiable, polymorphic: true

	after_commit -> { NotificationRelayJob.perform_later(self) }
	scope :unread, -> {where(read_at: nil)}
end
