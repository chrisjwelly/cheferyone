# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Users

# Create Home Chefs, Restaurants and Menus
5.times do |i|
  chef = User.create(email: "chef#{i + 1}@example.com", password: "123456", authentication_token: "chef#{i + 1}")
  restaurant = chef.create_restaurant(description: "Chef's Kitchen #{i + 1}", location: "NUS PGPR Block #{i + 1}")

  3.times do |j|
    restaurant.menus.create(name: "Menu ##{j + 1}", description: "A great menu.", price: 0.5 + i + j, rating: i + 0.5)
  end
end
