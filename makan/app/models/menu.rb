class Menu < ApplicationRecord
  validate :image_url_security

  belongs_to :restaurant, touch: true
  has_many :preorders, dependent: :destroy
  include AlgoliaSearch
  
  algoliasearch do
    attributes :name, :description, :price, :rating, :restaurant_id, :created_at, :updated_at, :restaurant_id
  end

  # Append logo to JSON
  def as_json(options)
    now = DateTime.now
    filtered_current_preorder = self.preorders.select { |preorder| time_in_range?(preorder, now) }
    # Invariant: There should be no overlapping intervals. Therefore either filtered_current_preorder
    # is an Array of 0 or 1 item
    current_preorder = filtered_current_preorder.empty? ? nil : filtered_current_preorder[0]

    # 'order' here refers to the sorting order, and not the restaurant order
    sorted_preorders = self.preorders.order(:start_date)

    super(options).merge({
      "preorders" => sorted_preorders.select { |preorder| preorder.end_date >= now },
      "current_preorder" => current_preorder,
    })
  end

  private
    def image_url_security
      image_source =  'https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/'
      errors.add(:image_url, 'untrusted image source') unless image_url.nil? || image_url.start_with?(image_source)
    end

    def time_in_range?(preorder, datetime)
      preorder.start_date <= datetime && preorder.end_date >= datetime
    end
end
