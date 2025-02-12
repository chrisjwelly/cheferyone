# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_22_095030) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "menus", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.text "description"
    t.decimal "price", precision: 10, scale: 2
    t.bigint "restaurant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["restaurant_id"], name: "index_menus_on_restaurant_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "recipient_id"
    t.datetime "read_at"
    t.string "content"
    t.integer "notifiable_id"
    t.string "notifiable_type"
    t.string "redirect_url"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer "quantity"
    t.integer "status"
    t.text "remarks"
    t.datetime "paid_date"
    t.integer "transaction_id"
    t.bigint "preorder_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["preorder_id"], name: "index_orders_on_preorder_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "preorders", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "quota"
    t.datetime "collection_date"
    t.bigint "menu_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["menu_id"], name: "index_preorders_on_menu_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.text "description"
    t.string "image_url"
    t.bigint "user_id", null: false
    t.string "location", null: false
    t.decimal "latitude", precision: 10, scale: 6, null: false
    t.decimal "longitude", precision: 10, scale: 6, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["latitude", "longitude"], name: "index_restaurants_on_latitude_and_longitude"
    t.index ["user_id"], name: "index_restaurants_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "content"
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_reviews_on_order_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "subscribable_type", null: false
    t.bigint "subscribable_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["subscribable_type", "subscribable_id"], name: "index_subscriptions_on_subscribable_type_and_subscribable_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "taggables_tags", id: false, force: :cascade do |t|
    t.string "taggable_type"
    t.bigint "taggable_id"
    t.bigint "tag_id"
    t.index ["tag_id"], name: "index_taggables_tags_on_tag_id"
    t.index ["taggable_type", "taggable_id"], name: "index_taggables_tags_on_taggable_type_and_taggable_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "authentication_token", limit: 30
    t.string "username"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "menus", "restaurants"
  add_foreign_key "orders", "preorders"
  add_foreign_key "orders", "users"
  add_foreign_key "preorders", "menus"
  add_foreign_key "restaurants", "users"
  add_foreign_key "reviews", "orders"
  add_foreign_key "subscriptions", "users"
end
