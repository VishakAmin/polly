class PollsController < ApplicationController

  def index
    polls = Poll.all.order('created_at DESC')
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


  private
  
  def poll_params
    params.require(:poll).permit(:title)
  end
end