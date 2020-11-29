<p align="center">
  <img src="./cheferyone_logo.png" alt="Cheferyone Logo" width="200">
</p>

## Because everyone can be a chef
During the COVID-19 Pandemic, many people stayed at home. A sizable number of them started opening small businesses from home, with food being one of the most popular choices.  Home chefs usually start businesses by opening pre-orders, and promoting through word-of-mouth or social media promotions.

However, this first step is often painful and home chefs would have relatively low outreach. *Cheferyone* is a Progressive Web Application which attempts to solve home chefs' pain points by providing a centralized platform for them to showcase their cooking and open pre-orders to a wider audience. Using Cheferyone would expand the potential buyers by some margin since now strangers can notice the home chefs' cooking and may want to try their food if they are interested.

Interested? Try our application at https://cheferyone.herokuapp.com now!

## Setup
Front-end codebase can be found under `makan-frontend` folder whereas our API back-end is in the root folder.
### Backend

1. Install ruby 2.6.5.
2. Run `gem install rails`.
3. Run `bundle install`.
4. Setup the database with `rails db:setup`
5. Try starting the server with `rails s`. Rails should be running at `localhost:3000`.

Note: if database migration files has been changed manually,
you might need to reset the whole database with the following sequence of commands
1. `rails db:drop`
2. `rails db:create`
3. `rails db:migrate`
4. `rails db:seed`

### Frontend

1. Install nodejs.
2. `cd` to `makan-frontend` folder and run `npm install`.
3. Start the frontend with `npm run start`. Frontend should be running at `localhost:3001`.

### Summary

1. To run server, simply run `rails s`.
2. To run frontend, `cd` to `makan-frontend` and run `npm run start`.

### Developers
* Christian James Welly (A0188493L)
    - Backend (Orders, Preorders, Menu, Review)
* Mario Lorenzo (A0193781U)
    - Backend (Notification, Subscription)
* Nelson Tan Kok Yi (A0183703H)
    - Frontend
    - DevOps: Deployment
* Otto Alexander Sutianto (A0184556U)
    - Backend (Recommendation Algorithm, Algolia Integration, Tagging)
* Yehezkiel Raymundo Theodoroes (A0184595M)
    - Tech lead
    - Backend (Authentication, Geolocation)
    - DevOps: Deployment
