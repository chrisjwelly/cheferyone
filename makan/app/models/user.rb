class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  attr_accessor :login

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :restaurant, dependent: :destroy
  has_many :menus, through: :restaurant
  has_many :subscriptions
  has_many :notifications, as: :notifiable 
  has_many :orders

  acts_as_token_authenticatable

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
