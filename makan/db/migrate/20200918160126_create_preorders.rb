class CreatePreorders < ActiveRecord::Migration[6.0]
  def change
    create_table :preorders do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.integer :quota
      t.datetime :collection_date
      t.references :menu, null: false, foreign_key: true

      t.timestamps
    end
  end
end
