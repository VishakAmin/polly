class PollsController < ApplicationController
  before_action :load_poll, only: %i[show update]

  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def create
    poll = Poll.new(poll_params)
    if poll.save
      render status: :ok, json: {notice: t('successfully_created')}
    else
      error = poll.errors.full_message.to_sentence
      render status: :unprocessable_entity, json: { errors: errors  }
    end 
  end

  def show
    render status: :ok, json: {poll: @poll}
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

end