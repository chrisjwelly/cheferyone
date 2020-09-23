class Restaurant < ApplicationRecord
  include Subscribable	

  validates :location, :description, presence: { message: "%{attribute} cannot be empty" }
  validate :image_url_security
  validates :longitude, presence: { message: "Longitude can't be empty" }
  validates :latitude, presence: { message: "Latitude can't be empty" }

  belongs_to :user, touch: true
  has_many :menus, dependent: :destroy
  has_many :orders, through: :menus

  has_many :connections, as: :taggable
  has_many :tags, through: :connections

  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  def as_json(options)
    super(options).merge({
      "username" => user.username,
      "tags" => tags
    })
  end

  private
    def image_url_security
      image_source =  'https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/'
      errors.add(:image_url, 'Untrusted image source') unless image_url.nil? || image_url.start_with?(image_source)
    end
end
