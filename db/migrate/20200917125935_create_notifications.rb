class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.integer :recipient_id
      t.datetime :read_at
      t.string :content
      t.integer :notifiable_id
      t.string :notifiable_type
      t.string :redirect_url
      t.string :image_url

      t.timestamps
    end
  end
end
