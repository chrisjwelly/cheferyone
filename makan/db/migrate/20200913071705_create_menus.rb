class CreateMenus < ActiveRecord::Migration[6.0]
  def change
    create_table :menus do |t|
      t.string :name
      t.text :description
      t.decimal :price, precision: 10, scale: 2
      t.decimal :rating

      t.timestamps
    end
  end
end
