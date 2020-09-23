class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include AlgoliaSearch
  attr_accessor :login
  after_touch :index!, if: :chef?
  # Chef search: username, restaurant_image_url, description, tags 
  algoliasearch if: :chef? do
    attributes :id, :email, :username
    add_attribute :image_url, :description, :tags, :location
    searchableAttributes ['username', 'description']
  end
  
  def chef?
    not restaurant.nil?
  end

  def image_url
    chef? ? restaurant.image_url : nil
  end

  def description
    chef? ? restaurant.description : nil
  end

  def tags
    chef? ? restaurant.tags : nil
  end

  def location
    chef? ? restaurant.location : nil
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :restaurant, dependent: :destroy
  has_many :menus, through: :restaurant
  has_many :subscriptions
  has_many :notifications, as: :notifiable 
  has_many :orders

  validates :username, presence: { message: "Username can't be empty" }
  validates :username, format: { with: /\A[a-zA-Z0-9_]+\Z/,
    message: 'Username should only include alphanumeric characters and underscore' }

  acts_as_token_authenticatable
  def as_json(options = {})
    new_options = options.merge({except: :authentication_token})
    super(new_options).merge({
      "is_chef" => chef?,
      "tags" => tags,
      "decription" => description,
      "image_url" => image_url,
      "location" => location
    })
  end

  def self.find_for_database_authentication warden_condition
  	conditions = warden_condition.dup
  	login = conditions.delete(:login)
  	where(conditions).where(["lower(username) = :value OR lower(email) = :value",
      { value: login.downcase}]).first
  end
end
