# CS3216 Assignment 3 Project

Front-end codebase can be found under `makan-frontend` folder whereas `makan` is our API back-end.

## Setup

### Backend

1. Install ruby 2.6.5.
2. `cd` to `makan` folder and run `gem install rails`.
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
2. `cd` to `frontend` folder and run `npm install`.
3. Start the frontend with `npm run start`. Frontend should be running at `localhost:3001`.

### Summary

1. To run server, `cd` to `makan` and run `rails s`.
2. To run frontend, `cd` to `makan-frontend` and run `npm run start`.

Team 1
- Christian James Welly
- Mario Lorenzo
- Nelson Tan Kok Yi
- Otto Alexander Sutianto
- Yehezkiel Raymundo Theodoroes
