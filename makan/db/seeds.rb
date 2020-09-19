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

def get_image_content_type(filename)
  "image/#{filename.split('.').last}"
end

def get_restaurant_file(filename)
  path = Rails.root.join('app', 'assets', 'restaurant_logos', filename)
  File.open(path)
end

def get_menu_file(filename)
  path = Rails.root.join('app', 'assets', 'menu_images', filename)
  File.open(path)
end

restaurant_logos = ["DinTaiFung.png", "KFC.png", "McDonalds.png", "PizzaHut.png", "Subway.png"]

menus = ["Chicken Wing", "Egg Fried Rice", "Pizza"]
# links are ordered based on the menus
menu_urls = [
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/2c27d230-91a3-4b8f-a53e-8b3469838dfaPizza.jpg?alt=media&token=528618d1-c5b4-448e-b5f7-1ab6fe088a7f",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/653e925d-bbe3-4d7c-b8a9-a4c62bf29a53EggFriedRice.jpg?alt=media&token=49d8a14e-edc1-4b26-80ad-574db11bc8a1",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/0e93b7f5-ba00-4102-8318-c5cc07ca74d1ChickenWing.jpeg?alt=media&token=a4bdbccd-c759-4c13-84c9-12f1c5856a83"
]

# to be filled with better images
restaurant_urls = [
  nil,
  nil,
  nil,
  nil,
  nil
]

# Create Home Chefs, Restaurants and Menus
5.times do |i|
  chef = User.create(email: "chef#{i + 1}@example.com", password: "123456", username: "chef#{i+1}", authentication_token: "chef#{i + 1}")
  restaurant = chef.create_restaurant(
    description: "Chef's Kitchen #{i + 1}", location: "NUS PGPR Block #{i + 1}", image_url: restaurant_urls[i]
  )

  3.times do |j|
    menu = restaurant.menus.create(
      name: menus[j], description: "A great menu.", price: 0.5 + i + j, rating: i + 0.5, image_url: menu_urls[j]
    )
    # Create a more jumbled-up order, with preorder dates that has ended before now
    [2, -2, 0].each { |x|
      menu.preorders.create(start_date: DateTime.now + x,
        end_date: DateTime.now + x + 1,
        collection_date: DateTime.now + x + 2,
        quota: 10)
    }
  end
end
