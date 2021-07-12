require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(first_name: 'Sam',
      last_name: 'Smith',
      email: 'sam@example.com',
      password: 'welcome',
      password_confirmation: 'welcome')
    Poll.delete_all

    @poll = Poll.new(title: 'This is a new Testing Poll', user: @user)
  end

  def test_instance_of_poll
    assert_not_instance_of User, @poll
  end

  def test_value_of_title_assigned
    assert_equal "This is a new Testing Poll", @poll.title
  end

  def test_poll_should_be_not_be_valid_without_title
    @poll.title = ''
    assert_not @poll.valid?
    assert_equal ["Title can't be blank"], @poll.errors.full_messages
  end

end