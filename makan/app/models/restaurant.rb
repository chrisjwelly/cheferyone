class Restaurant < ApplicationRecord
  belongs_to :user, touch: true
  has_many :menus, dependent: :destroy
end
