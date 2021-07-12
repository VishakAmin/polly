require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam",
                     last_name: "Smith",
                     email: "sam@example.com",
                     password: "welcome",
                     password_confirmation: "welcome")
  end


  def test_instance_of_user
    assert_instance_of User, @user
  end

  def test_not_instance_of_user
    poll = Poll.new
    assert_not_instance_of User, poll
  end


  def test_user_should_be_not_be_valid_without_first_name
    @user.first_name = ''
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end


  def test_user_should_be_not_be_valid_without_last_name
    @user.last_name = ''
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_be_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?
    @user.save
    assert_equal ["Email can't be blank", "Email is invalid"],
                   @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
  
    test_user = @user.dup
    assert_not test_user.valid?
  
    assert_equal ["Email has already been taken"],
                   test_user.errors.full_messages
  end

  def test_reject_email_of_invalid_length
    @user.email = ('a' * 50) + '@test.com'
    assert @user.invalid?
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = 'a' * 36
    assert @user.invalid?
  end

  # embed new test cases here...
end