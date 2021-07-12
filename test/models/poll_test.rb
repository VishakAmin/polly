require 'test_helper'

class PollTest < ActiveSupport::TestCase

  def setup
    @user = User.new(first_name: 'Sam',
      last_name: 'Smith',
      email: 'sam@example.com',
      password: 'welcome',sh
      password_confirmation: 'welcome')

      Poll.delete_all

    @poll = Poll.new(title: 'This is a new Testing Poll', user: @user)
  end

  def test_instance_of_poll
    assert_not_instance_of User, @poll
  end

  def test_value_of_title_assigned
    assert_equal 'This is a new Testing Poll', @poll.title
  end

  def test_poll_should_not_be_valid_without_title
    @poll.title = ''
    assert @poll.invalid?
  end

end