class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.timestamps
    end

    create_table :taggables_tags, id: false do |t|
      t.references :taggable, polymorphic: true
      t.belongs_to :tag
    end
  end
end
