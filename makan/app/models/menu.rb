class Menu < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :restaurant, touch: true
  include AlgoliaSearch
  
  algoliasearch do
    attributes :name, :description, :price, :rating, :restaurant_id, :created_at, :updated_at, :restaurant_id
  end
  
  has_one_attached :image

  def get_image_url
    url_for(self.image)
  end

  # Append logo to JSON
  def as_json(options)
    super(options).merge({
      "image_url" => get_image_url
    })
  end
end
