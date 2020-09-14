class Menu < ApplicationRecord
  belongs_to :restaurant, touch: true
end
