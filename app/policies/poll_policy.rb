class PollPolicy
  attr_reader :user, :poll

  def initialize(user, poll)
    @user = user
    @poll = poll
  end

  def show?
    true
  end

  def update?
    poll.user_id == user.id
  end

  def create?
    true
  end

  def destroy?
    poll.user_id == user.id
  end
end