require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'sam@example.com',
                    password: 'welcome',
                    password_confirmation: 'welcome')
    @poll = Poll.new(title: 'This is a new Testing Poll', user: @user)

    Option.delete_all

    @option = Option.new(content: 'This is a test poll options', poll: @poll)
  end

  def test_option_should_be_not_be_valid_without_option
    @option.content = ''
    assert @option.invalid?
    assert_equal ["Options can't be blank"], @poll.errors.full_messages
  end

  def test_option_content_should_not_exceed_maximum_length
    @option.content = 'a' * 120
    assert @option.invalid?
  end

end