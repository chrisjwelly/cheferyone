class Menu < ApplicationRecord
  include Subscribable
  include AlgoliaSearch

  validates :name, :description, :price, presence: { message: "%{attribute} cannot be empty" }
  validate :image_url_security
  belongs_to :restaurant, touch: true
  has_many :preorders, dependent: :destroy
  after_touch :index!
  # Menu search: name, menu_image_url, tags, description, menu_id 
  algoliasearch do
    attributes :name, :description, :image_url, :price, :id, :restaurant_id, :tags
    add_attribute :current_preorder
    searchableAttributes ['name', 'description']
  end

  has_many :connections, as: :taggable
  has_many :tags, through: :connections
  has_many :subscribers, through: :subscriptions, class_name: "User"
  has_many :orders, through: :preorders
  has_many :reviews, through: :orders

  def current_preorder
    now = DateTime.now
    
    # Invariant: There should be no overlapping intervals. Therefore either filtered_current_preorder
    # is an Array of 0 or 1 item
    preorders.where("preorders.start_date <= ? AND ? <= preorders.end_date ", now, now).take
  end

  # Return the current and upcoming preorders in ascending order
  def current_and_upcoming_preorders
    now = DateTime.now
    preorders.where("preorders.end_date >= ? ", now).order(:start_date)
  end

  # Append logo to JSON
  def as_json(options = {})
    now = DateTime.now

    # 'order' here refers to the sorting order, and not the restaurant order
    rating = get_rating(reviews)

    super(options).merge({
      "tags" => tags,
      "username" => restaurant.user.username,
      "preorders" => current_and_upcoming_preorders,
      "current_preorder" => current_preorder,
      "rating" => rating,
      "review_counts" => reviews.count
    })
  end

  def subscribers
    Subscription.where(subscribable: self).users.ids
  end

  private

    def get_rating(reviews)
      (reviews.average(:rating) || 0).round(2)
    end

    def image_url_security
      image_source =  'https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/'
      errors.add(:image_url, 'Untrusted image source') unless image_url.nil? || image_url.start_with?(image_source)
    end
end
