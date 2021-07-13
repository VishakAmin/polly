class UsersController < ApplicationController

  def index
    users = User.all.as_json(only: %i[id first_name last_name])
    render status: :ok, json: { users: users }
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      render status: :ok, json: {  
        auth_token: @user.authentication_token,
        user_id: @user.id,
        user_first_name: @user.first_name, }
    else
      render status: :unprocessable_entity, json: {
        errors: @user.errors.full_messages.to_sentence
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end