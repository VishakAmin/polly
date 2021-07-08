Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root "home#index"
  # get '*path', to: 'home#index', via: :all
  resources :polls, only: [:index, :create]

  root "home#index"
  get '*path', to: 'home#index', via: :all

end
