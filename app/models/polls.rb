class Poll < ApplicationRecord
  validates :title, presence: true
  def index
    @polls = Poll.all
  end
end
