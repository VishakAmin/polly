class ApplicationController < ActionController::Base

  def authenticate_user_using_x_auth_token
    user_email = request.headers["X-Auth-Email"]
    auth_token = request.headers["X-Auth-Token"].presence
    user = user_email && User.find_by_email(user_email)

    if user && auth_token &&
      ActiveSupport::SecurityUtils.secure_compare(
        user.authentication_token, auth_token
      )
      @current_user = user
    else
      render status: :unauthorized, json: {
        errors: ["Could not authenticate with the provided credentials"]
      }
    end
  end

  private
    def current_user
      @current_user
    end
end