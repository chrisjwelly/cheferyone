class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      t.text :description
      t.string :image_url
      t.references :user, null: false, foreign_key: true

      t.string :location, null: false
      t.decimal :latitude, precision: 10, scale: 6, null: false
      t.decimal :longitude, precision: 10, scale: 6, null: false

      t.timestamps
    end
    add_index :restaurants, [:latitude, :longitude]
  end
end
