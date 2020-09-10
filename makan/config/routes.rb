Rails.application.routes.draw do
  # Since everything is a json, any endpoint has to be put inside this block
  scope '/api', defaults: { format: :json } do
    get 'test/index'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

    devise_for :users, skip: :all         # will be customized manually
    devise_scope :user do
      post 'users/sign_in', to: 'users/sessions#create'
      delete 'users/sign_out', to: 'users/sessions#destroy'

      post 'users', to: 'users/registrations#create'
      delete 'users', to: 'users/registrations#destroy'
      patch 'users', to: 'users/registrations#update'
      put 'users', to: 'users/registrations#update'
    end
  end
end
