Rails.application.routes.draw do
  
  resources :codes
  resources :saved_lessons
  resources :lessons
  resources :user_lessons
  resources :users

  # Custom routes for login/logout
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Custom route to stay logged in
  get "/auth", to: "sessions#show"

  get "/your-lessons", to: "users#your_lessons"




  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
