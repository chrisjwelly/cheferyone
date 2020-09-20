module Taggable
    extend ActiveSupport::Concern

    included do
        has_and_belongs_to_many :tags, :as => :taggable
    end
end