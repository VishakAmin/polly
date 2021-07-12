class PollsController < ApplicationController
  after_action :verify_authorized, only: %i[update destroy]
  before_action :load_poll, only: %i[show update destroy] 
  before_action :authenticate_user_using_x_auth_token, except: :index
  before_action :authorize_poll, only: %i[update destroy]
  before_action :load_options, only: %i[show update]
  before_action :load_responses, only: %i[show]
  
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def create
    poll = Poll.new(poll_params)

    if poll.save
      render status: :ok, json: {notice: t('successfully_created')}
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }

    end 
  end

  def show
    render status: :ok, json: {
      poll: @poll, options: @options , responses: @responses
    }
  end

  def update
    if @poll.update(poll_params)
      render status: :ok, json: {notice: 'Successfully updated poll.'}
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: {errors: errors}
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
    params.require(:poll).permit(:title, :options_attributes => [:id, :content])
.merge(user_id: @current_user.id)
  end

  def load_poll
    @poll = Poll.find(params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def load_options
    @options = Option.where(poll_id: @poll.id)
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def load_responses
    @responses = Response.where(poll_id: params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors }
  end

  def authorize_poll
    authorize @poll
  end
end