class Connection < ApplicationRecord
  self.table_name = 'taggables_tags'

  belongs_to :taggable, polymorphic: true
  belongs_to :tag
end
