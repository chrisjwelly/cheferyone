class Restaurant < ApplicationRecord
  include Subscribable	

  validate :image_url_security
  belongs_to :user, touch: true
  has_many :menus, dependent: :destroy
  has_many :orders, through: :menus

  has_many :connections, as: :taggable
  has_many :tags, through: :connections

  def as_json(options)
    super(options).merge({
      "tags" => tags,
    })
  end
  private
  def image_url_security
    image_source =  'https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/'
    errors.add(:image_url, 'untrusted image source') unless image_url.nil? || image_url.start_with?(image_source)
  end
end
