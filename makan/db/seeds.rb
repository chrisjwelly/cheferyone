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

menus = [
  "Soya Chicken Rice",
  "Char Siew Rice",
  "Roasted Pork Rice",
  "Pork Rib Rice",
  "Soya Chicken Noodle",
  "Char Siew Noodle",
  "Roasted Pork Noodle",
  "Pork Rib Noodle",
  "Soya Chicken Hor Fun",
  "Char Siew Hor Fun",
  "Roasted Pork Hor Fun",
  "Pork Rib Hor Fun",
]

menu_urls = [
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Soya-Sauce-Chicken-Rice_1.jpg?alt=media&token=0afa9ecc-f4a6-4e80-a4bc-e576e9444e8b",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Char-Siew-Rice_1.jpg?alt=media&token=ae18bc94-e58a-46c9-b281-0b5ebf3a38f8",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Roast-Pork-Rice.jpg?alt=media&token=33b2b45d-81f9-44c7-ac84-2338483778c6",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Pork-Rib-Rice.jpg?alt=media&token=613ff52e-ceb9-428b-9803-8a8496166b08",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Soya-Chicken-Noodle.jpg?alt=media&token=ca3353c4-e617-4c21-9bd2-ce43493697e6",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Char-Siew-Noodle.jpg?alt=media&token=d033c0fb-3ffb-4de4-8955-c31c11bdfdd4",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Roast-Pork-Noodle.jpg?alt=media&token=b6c74167-f4d2-488b-be6c-154f7a119fd4",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Pork-Rib-Noodle.jpg?alt=media&token=e5823a30-ec0a-4be3-94b3-37d4b6128ec6",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Soya-Chicken-Hor-Fun.jpg?alt=media&token=6119e306-12b0-4e9b-a4fe-28793bf1837a",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Char-Siew-Hor-Fun.jpg?alt=media&token=3e835238-f85c-4b92-9469-01b2915cc47c",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Roast-Pork-Hor-Fun.jpg?alt=media&token=72ab12af-35c3-49e3-99d8-5c66740e621a",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Pork-Rib-Hor-Fun_1.jpg?alt=media&token=36ec6401-11de-4f23-9844-473dbd6b71b8",
]

restaurant_urls = [
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/hawkerchan.jpeg?alt=media&token=fca2644b-0b39-4029-b1c9-7a5b4c0fa70e",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/sin-swee-kee-chicken-rice-restaurant.jpg?alt=media&token=2f4f295d-550c-4f17-9381-fffce8f40f0e",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/nam-kee-chicken-rice-restaurant.jpg?alt=media&token=e7f9e2aa-4081-40cc-a3d0-dc2fc6e3d22d",
]

desc = [
  "A great menu", 
  "A good menu", 
  "A good menu", 
  "A good menu", 
  "A good menu", 
  "A good menu", 
  "A good menu", 
  "A good menu", 
  "A good menu", 
  "A good menu",
  "A good menu",
  "A good menu",
]

tags = [
  "Chinese",
  "Indian",
  "Western",
  "Bubble Tea",
  "Fast Food",
  "Noodles",
  "Chicken",
  "Dessert",
  "Halal",
  "Dim Sum",
  "Beverages",
  "Indonesian",
]
# Create Home Chefs, Restaurants, Menus, and Tags
chinese_tag = Tag.create(name: tags[0])
indian_tag = Tag.create(name: tags[1])
western_tag = Tag.create(name: tags[2])
bubbletea_tag = Tag.create(name: tags[3])
fastfood_tag = Tag.create(name: tags[4])
noodles_tag = Tag.create(name: tags[5])
chicken_tag = Tag.create(name: tags[6])
dessert_tag = Tag.create(name: tags[7])
halal_tag = Tag.create(name: tags[8])
dimsum_tag = Tag.create(name: tags[9])
beverages_tag = Tag.create(name: tags[10])
indonesian_tag = Tag.create(name: tags[11])
list_of_tags = [chinese_tag, indian_tag, western_tag, bubbletea_tag, fastfood_tag, noodles_tag, chicken_tag, dessert_tag, halal_tag, dimsum_tag, beverages_tag, indonesian_tag]

# Create Home Chefs, Restaurants and Menus
3.times do |i|
  chef = User.create(email: "chef#{i + 1}@example.com", password: "123456", username: "chef#{i+1}", authentication_token: "chef#{i + 1}")
  restaurant = chef.create_restaurant(
    description: "Chef's Kitchen #{i + 1}", location: "NUS PGPR Block #{i + 1}", image_url: restaurant_urls[i]
  )

  12.times do |j|
    menu = restaurant.menus.create(
      name: menus[j], description: desc[j], price: 0.5 + i + j, rating: i + 0.5, image_url: menu_urls[j], tags: [list_of_tags[j]]
    )
    [2, -2, 0].each { |x|
      menu.preorders.create(start_date: DateTime.now + x,
        end_date: DateTime.now + x + 1,
        collection_date: DateTime.now + x + 2,
        quota: 10)
    }
  end
end
