Rails.application.routes.draw do
  # Since everything is a json, any endpoint has to be put inside this block
  scope '/api/v1', defaults: { format: :json } do
    get 'test/index'
    get 'authenticated', to: 'test#authenticated'

    devise_for :users, skip: :all         # will be customized manually
    devise_scope :user do
      post 'users/sign_in', to: 'users/sessions#create'
      delete 'users/sign_out', to: 'users/sessions#destroy'

      post 'users', to: 'users/registrations#create'
      delete 'users', to: 'users/registrations#destroy'
      patch 'users', to: 'users/registrations#update'
      put 'users', to: 'users/registrations#update'
    end

    resources :menus do
      collection do
        get 'recommended'
        get 'near_you'
        get 'recent'
      end
    end

    resources :chefs, only: [:index, :show]
    resource '/your_restaurant', controller: :restaurants
  end
end
