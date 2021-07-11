class ResponsesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: create

  def create
    @response = Response.new(response_params)
    
    if @response.save
      render status: ok, json: { isVoted : true}
    else
      errors = @respond.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def respond_params
    params.require(:response).permit(:poll_id, :option_id)
  end

  def response_exist
    response = Response.where(
      poll_id: respond_params[:poll_id]
      user_id: @current_user.id
    )

    if response.length > 0
      render status: :unprocessable_entity, json:{
        errors: "You have already voted"
      }
    end
  end
end