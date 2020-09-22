class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include AlgoliaSearch
  attr_accessor :login
  after_touch :index!
  # Chef search: username, restaurant_image_url, description, tags 
  algoliasearch if: :chef? do
    add_attribute :image_url, :description, :tags
    searchableAttributes ['username', 'description']
  end

  def image_url
    restaurant.image_url
  end

  def description
    restaurant.description
  end

  def tags
    restaurant.tags
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :restaurant, dependent: :destroy
  has_many :menus, through: :restaurant
  has_many :subscriptions
  has_many :notifications, as: :notifiable 
  has_many :orders

  acts_as_token_authenticatable
  def as_json(options)
    super(options).merge({
      "tags" => restaurant.tags,
    })
  end
  def self.find_for_database_authentication warden_condition
  	conditions = warden_condition.dup
  	login = conditions.delete(:login)
  	where(conditions).where(["lower(username) = :value OR lower(email) = :value",
      { value: login.downcase}]).first
  end
  
  def chef?
    not restaurant.nil?
  end
end
