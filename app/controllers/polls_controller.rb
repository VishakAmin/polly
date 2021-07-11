class PollsController < ApplicationController
  before_action :load_poll, only: %i[show update destroy] 
  before_action :authenticate_user_using_x_auth_token, except: :index
  before_action :authorize_poll, only: %i[update destroy]

  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def create
    poll = Poll.new(poll_params)
    if poll.save
      render status: :ok, json: {notice: t('successfully_created')}
      errors = poll.errors.full_messages
    else
      render status: :unprocessable_entity, json: { errors: errors }

    end 
  end

  def show
    render status: :ok, json: {poll: @poll}
  end

  def update
    if @poll.update(poll_params)
      render status: :ok, json: {notice: 'Successfully updated poll.'}
    else
      render status: :unprocessable_entity, json: {errors: error}
    end
  end

  def destroy 
    if @poll.destroy
      render status: :ok, json: { notice: 'Successfully deleted poll.' }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private
  
  def poll_params
    params.require(:poll).permit(:title)
  end

  def load_poll
    @poll = Poll.find(params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def authorize_poll
    authorize @poll
  end
end