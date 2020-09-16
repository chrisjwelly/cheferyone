# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Users
5.times do |i|
  User.create(email: "user#{i + 1}@example.com", password: "123456", username: "user#{i+1}", authentication_token: "user#{i + 1}")
end

def get_logos_path(filename)
  Rails.root.join('app', 'assets', 'restaurant_logos', filename)
end

def get_image_content_type(filename)
  "image/#{filename.split('.').last}"
end

def get_file(filename)
  File.open(get_logos_path(filename))
end

restaurant_logos = ["DinTaiFung.png", "KFC.png", "McDonalds.png", "PizzaHut.png", "Subway.png"]
# Create Home Chefs, Restaurants and Menus
5.times do |i|
  chef = User.create(email: "chef#{i + 1}@example.com", password: "123456", username: "chef#{i+1}", authentication_token: "chef#{i + 1}")
  restaurant = chef.create_restaurant(description: "Chef's Kitchen #{i + 1}", location: "NUS PGPR Block #{i + 1}")

  filename = restaurant_logos[i]
  restaurant.logo.attach({
    io: get_file(filename),
    filename: filename,
    content_type: get_image_content_type(filename),
  })

  3.times do |j|
    restaurant.menus.create(name: "Menu ##{j + 1}", description: "A great menu.", price: 0.5 + i + j, rating: i + 0.5)
  end
end
