Rails.application.routes.draw do
  # Since everything is a json, any endpoint has to be put inside this block
  scope '/api', defaults: { format: :json } do
    get 'test/index'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  end
end
