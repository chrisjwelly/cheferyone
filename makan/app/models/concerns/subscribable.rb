module Subscribable
  extend ActiveSupport::Concern

  included do
    has_many :subscriptions, :as => :subscribable
  end
end