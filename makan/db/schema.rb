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

ActiveRecord::Schema.define(version: 2020_09_18_160126) do

  create_table "menus", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.text "description"
    t.decimal "price", precision: 10, scale: 2
    t.decimal "rating"
    t.integer "restaurant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "subscriptions_id"
    t.index ["restaurant_id"], name: "index_menus_on_restaurant_id"
    t.index ["subscriptions_id"], name: "index_menus_on_subscriptions_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "recipient_id"
    t.datetime "read_at"
    t.string "content"
    t.integer "notifiable_id"
    t.string "notifiable_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "preorders", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "quota"
    t.datetime "collection_date"
    t.integer "menu_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["menu_id"], name: "index_preorders_on_menu_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.text "description"
    t.string "image_url"
    t.string "location"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_restaurants_on_user_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "subscribable_type", null: false
    t.integer "subscribable_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["subscribable_type", "subscribable_id"], name: "index_subscriptions_on_subscribable_type_and_subscribable_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
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
  add_foreign_key "menus", "subscriptions", column: "subscriptions_id"
  add_foreign_key "preorders", "menus"
  add_foreign_key "restaurants", "users"
  add_foreign_key "subscriptions", "users"
end
