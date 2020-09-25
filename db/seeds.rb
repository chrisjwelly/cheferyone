# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Users
list_of_users = []
4.times do |i|
  user = User.create(email: "user#{i + 1}@example.com", password: "123456", username: "user#{i+1}", authentication_token: "user#{i + 1}")
  list_of_users.append(user)
end

def create_preorders(menu)
  [2, -2, 0].each { |x|
    menu.preorders.create(start_date: DateTime.now + x,
      end_date: DateTime.now + x + 1,
      collection_date: DateTime.now + x + 2,
      quota: 15)
  }
end

menus = [
  "Soya Chicken Rice",
  "Char Siew Noodle",
  "Roasted Pork Hor Fun",
  "Tandoori Chicken",
  "Ayam penyet",
  "Butter Chicken",
  "Javanese Fried Noodle",
  "Javanese Fried Rice",
  "Fried Kway Teow",
  "Chicken Karage",
  "Sashimi",
  "Ayam Geprek",
]

menu_urls = [
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Soya-Sauce-Chicken-Rice_1.jpg?alt=media&token=0afa9ecc-f4a6-4e80-a4bc-e576e9444e8b",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Char-Siew-Noodle.jpg?alt=media&token=d033c0fb-3ffb-4de4-8955-c31c11bdfdd4",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Roast-Pork-Hor-Fun.jpg?alt=media&token=72ab12af-35c3-49e3-99d8-5c66740e621a",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/chicken-tandori-1526595014.jpg?alt=media&token=c2d40c45-2856-460f-87f1-1de54800bcca",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/ayam-penyet.jpg?alt=media&token=dd58249c-ff6d-4626-8287-09d08c2a5a1b",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/butter-chicken.jpeg?alt=media&token=7904f35d-51a9-48f2-9625-483f9f8f456c",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/javanese-fried-noodle-recipe-main-photo.jpg?alt=media&token=7a83f8f3-c968-4115-84ec-84059e8ea898",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/javanese-fried-rice.jpg?alt=media&token=92e6b974-d15b-49b9-93f3-3e6ce4d09d9c",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/fried-kway-teow.jpeg?alt=media&token=bf735a22-8335-4cd4-8aee-509ff07b2c27",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/chicken-karage.jpg?alt=media&token=87da77d4-30ea-477f-a5ad-7f8348bedb4f",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/sashimi.jpg?alt=media&token=206b7730-2cd9-46be-8b39-ef4c6d4c0696",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/ayam-geprek.jpg?alt=media&token=f89a1a52-119a-470b-9860-58366f4e2d2d",
]

restaurant_urls = [
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/hawkerchan.jpeg?alt=media&token=fca2644b-0b39-4029-b1c9-7a5b4c0fa70e",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/al-amaan.jpeg?alt=media&token=5a040b0d-cf1b-4cd1-a758-06352608738a",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/indochili-restaurant.jpg?alt=media&token=06a9e4ee-94c1-41ea-a7a1-51694a43550b",
  "https://firebasestorage.googleapis.com/v0/b/makan-a9ad2.appspot.com/o/Hokben.jpg?alt=media&token=3d97a498-c610-4283-bca6-841a7255e3c4",  
]

desc = [
  "Ah Beng Soya Chicken Rice, Best Soya Chicken Rice.", 
  "Ah Beng Char Siew Noodle, Best Char Siew Noodle.", 
  "Ah Beng Roasted Pork Hor Fun, Best Roasted Pork Hor Fun.", 
  "Special Tandoori Chicken from India.", 
  "Indonesian fried chicken, cousin of India.", 
  "Curry-ish indian chicken.", 
  "Special javanese noodle by Joko, Javanese-Chinese gangster.", 
  "Special javanese rice by Joko, Javanese-Chinese gangster.", 
  "Special Fried Kway Teow by Joko, Javanese-Chinese gangster.", 
  "Deep fried high quality chicken fried with flour.",
  "Your regular sashimi, put in the plate by our best chef",
  "Super spicy chicken. You won't regret.",
]

# Create Tags
chinese_tag = Tag.create(name: "Chinese")
indian_tag = Tag.create(name: "Indian")
japanese_tag = Tag.create(name: "Japanese")
indonesian_tag = Tag.create(name: "Indonesian")
javanese_tag = Tag.create(name: "Javanese")
fastfood_tag = Tag.create(name: "Fast Food")
noodles_tag = Tag.create(name: "Noodles")
rice_tag = Tag.create(name: "Rice")
chicken_tag = Tag.create(name: "Chicken")
pork_tag = Tag.create(name: "Pork")
halal_tag = Tag.create(name: "Halal")
sushi_tag = Tag.create(name: "Sushi")

# Create Users
ah_beng = User.create(email: "chef1@example.com", password: "123456", username: "ah_beng", authentication_token: "chef1")
odading_mang_oleh = User.create(email: "chef2@example.com", password: "123456", username: "odading_mang_oleh", authentication_token: "chef2")
joko = User.create(email: "chef3@example.com", password: "123456", username: "joko", authentication_token: "chef3")
yakuza = User.create(email: "chef4@example.com", password: "123456", username: "yakuza", authentication_token: "chef4")
list_of_chefs = [ah_beng, odading_mang_oleh, joko, yakuza]

locations = ["Choa Chu Kang Ave 2", "Prince George's Park Residence", "UTown Residence", "3 Balestier Road"]
latitudes = [1.3783642, 1.2909605, 1.3052071, 1.3164314]
longitudes = [103.7405676, 103.7789504, 103.7717158, 103.8559093]

# Create Restaurants
ah_beng_resto = ah_beng.create_restaurant(
  description: "Food from Ah Beng For Ah Beng's.", location: locations[0], image_url: restaurant_urls[0],
  tags: [chinese_tag], latitude: latitudes[0], longitude: longitudes[0]
)

mang_oleh_place = odading_mang_oleh.create_restaurant(
  description: "Odading Mang Oleh's place to eat. The best indian indonesian restaurant in the world.",
  location: locations[1], image_url: restaurant_urls[1], tags: [indian_tag, indonesian_tag],
  latitude: latitudes[1], longitude: longitudes[1]
)

chef_joko = joko.create_restaurant(
  description: "Best subset of Indonesia restaurant in Singapore.", location: locations[2],
  image_url: restaurant_urls[2], tags: [javanese_tag, indonesian_tag, chinese_tag],
  latitude: latitudes[2], longitude: longitudes[2]
)

yakuza_restaurant = yakuza.create_restaurant(
  description: "Hangout place for yakuzas.", location: locations[3], image_url: restaurant_urls[3],
  tags: [japanese_tag, chinese_tag], latitude: latitudes[3], longitude: longitudes[3]
)

# Create Menus
soya_chicken_rice = ah_beng_resto.menus.create(
  name: menus[0], description: desc[0], price: 0.5, image_url: menu_urls[0], tags: [chinese_tag, chicken_tag, rice_tag]
)
create_preorders(soya_chicken_rice)

char_siew_noodle = ah_beng_resto.menus.create(
  name: menus[1], description: desc[1], price: 1.5, image_url: menu_urls[1], tags: [chinese_tag, noodles_tag, pork_tag]
)
create_preorders(char_siew_noodle)

roasted_pork_hor_fun = ah_beng_resto.menus.create(
  name: menus[2], description: desc[2], price: 2.5, image_url: menu_urls[2], tags: [chinese_tag, noodles_tag, pork_tag]
)
create_preorders(roasted_pork_hor_fun)

tandoori_chicken = mang_oleh_place.menus.create(
  name: menus[3], description: desc[3], price: 0.5, image_url: menu_urls[3], tags: [indian_tag, chicken_tag, halal_tag]
)
create_preorders(tandoori_chicken)

ayam_penyet = mang_oleh_place.menus.create(
  name: menus[4], description: desc[4], price: 1.5, image_url: menu_urls[4], tags: [indonesian_tag, chicken_tag, halal_tag]
)
create_preorders(ayam_penyet)

butter_chicken = mang_oleh_place.menus.create(
  name: menus[5], description: desc[5], price: 2.5, image_url: menu_urls[5], tags: [indian_tag, chicken_tag, halal_tag]
)
create_preorders(butter_chicken)

javanese_fried_noodle = chef_joko.menus.create(
  name: menus[6], description: desc[6], price: 0.5, image_url: menu_urls[6], tags: [javanese_tag, indonesian_tag, noodles_tag, halal_tag]
)
create_preorders(javanese_fried_noodle)

javanese_fried_rice = chef_joko.menus.create(
  name: menus[7], description: desc[7], price: 1.5, image_url: menu_urls[7], tags: [javanese_tag, indonesian_tag, rice_tag, halal_tag]
)
create_preorders(javanese_fried_rice)

fried_kway_teow = chef_joko.menus.create(
  name: menus[8], description: desc[8], price: 2.5, image_url: menu_urls[8], tags: [chinese_tag, indonesian_tag, noodles_tag]
)
create_preorders(fried_kway_teow)

chicken_karage = yakuza_restaurant.menus.create(
  name: menus[9], description: desc[9], price: 0.5, image_url: menu_urls[9], tags: [japanese_tag, indonesian_tag, chicken_tag]
)
create_preorders(chicken_karage)

sashimi = yakuza_restaurant.menus.create(
  name: menus[10], description: desc[10], price: 1.5, image_url: menu_urls[10], tags: [japanese_tag, sushi_tag]
)
create_preorders(sashimi)

ayam_geprek = yakuza_restaurant.menus.create(
  name: menus[11], description: desc[11], price: 2.5, image_url: menu_urls[11], tags: [indonesian_tag, chicken_tag, halal_tag]
)
create_preorders(ayam_geprek)

4.times do |i|
  now = DateTime.now
  3.times do |j|
    order1 = list_of_users[i].orders.create(quantity: 1, status: j + 1, remarks: "This is a dummy remark", preorder_id: (j + 1 + 3*i), transaction_id: j + 1, paid_date: now)
    if j == 2
      order1.create_review(rating: [i,j].max + 2 , content: "I really like this menu")
    end
    order2 = list_of_users[i].orders.create(quantity: 1, status: j + 1, remarks: "Second remark", preorder_id: 12 + (j + 1 + 3*i), transaction_id: j + 1, paid_date: now)
    if j == 2
      order2.create_review(rating: ([i,j].max + 5)/2 , content: "So-So ah")
    end
  end

  3.times do |j|
    order3 = list_of_users[i].orders.create(quantity: 1, status: :unpaid, remarks: "Unpaid in the seed number: #{j}", preorder_id: 24 + (j + 1 + 3*i))
    order3.create_review(rating: ([i,j].min + 2)/2 , content: "Disgusting")
  end
end
