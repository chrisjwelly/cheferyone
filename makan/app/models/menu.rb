class Menu < ApplicationRecord
  validate :image_url_security

  belongs_to :restaurant, touch: true
  include AlgoliaSearch
  
  algoliasearch do
    attributes :name, :description, :price, :rating, :restaurant_id, :created_at, :updated_at, :restaurant_id
  end

  private
  def image_url_security
    image_source =  'https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/'
    errors.add(:image_url, 'untrusted image source') unless image_url.nil? || image_url.start_with?(image_source)
  end
end
