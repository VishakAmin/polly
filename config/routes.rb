Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root "home#index"
  # get '*path', to: 'home#index', via: :all
  # resources :polls, except: %i[new edit]
  resources :polls, only: %i[index create show update destroy]
  resources :users, only: %i[create index]


  root "home#index"
  get '*path', to: 'home#index', via: :all

end
