class Restaurant < ApplicationRecord
  validate :image_url_security

  belongs_to :user, touch: true
  has_many :menus, dependent: :destroy

  private
  def image_url_security
    image_source =  'https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/'
    errors.add(:image_url, 'untrusted image source') unless image_url.nil? || image_url.start_with?(image_source)
  end
end
