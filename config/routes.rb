Rails.application.routes.draw do
  # Since everything is a json, any endpoint has to be put inside this block
  mount ActionCable.server => '/cable'

  scope '/api/v1', defaults: { format: :json } do
    get 'test/index'
    get 'authenticated', to: 'test#authenticated'

    devise_for :users, skip: [:registrations, :passwords, :sessions], controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}
    devise_scope :user do
      post 'users/sign_in', to: 'users/sessions#create'
      delete 'users/sign_out', to: 'users/sessions#destroy'

      get 'user', to: 'users/registrations#index'
      post 'users', to: 'users/registrations#create'
      delete 'users', to: 'users/registrations#destroy'
      patch 'users', to: 'users/registrations#update'
      put 'users', to: 'users/registrations#update'
    end

    get 'notifications', to: 'notifications#index'

    resources :menus, only: [:index, :show]  do
      collection do
        get 'filter'
        get 'search'
        get 'recommended'
        get 'near_you'
        get 'recent'
      end

      member do
        get 'belongs'
        post 'subscribe'
        post 'unsubscribe'
        get 'is_subscribed'
        get 'reviews'
      end
    end

    resources :chefs, only: [:index, :show], param: :username do
      resources :menus, only: [:index, :show], controller: 'chefs/menus'

      collection do
        get 'filter'
        get 'search'
      end

      member do
        post 'subscribe'
        post 'unsubscribe'
        get 'is_subscribed'
      end
    end

    resources :orders do
      collection do
        get 'all'
      end
      member do
        patch 'update_status'
        resource 'review'
      end
    end

    resource 'cart', controller: :cart, only: [:show] do
      member do
        post 'pay'
      end
    end

    resource '/your_restaurant', controller: :restaurants do
      collection do
        resources 'menus', :controller => "your_restaurant/menus"
        resources 'orders', :controller => "your_restaurant/orders", only: [:index, :show] do
          collection do
            get 'paid'
            get 'confirmed'
            get 'completed'
            get 'ended'
          end

          member do
            patch 'update_status'
          end
        end
      end
    end
  end

  get '*path', to: "static_pages#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
