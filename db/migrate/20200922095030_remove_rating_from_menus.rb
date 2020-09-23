class RemoveRatingFromMenus < ActiveRecord::Migration[6.0]
  def change
    remove_column :menus, :rating, :float
  end
end
