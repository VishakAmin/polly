module Authorizable
  extend ActiveSupport::Concern

  included do
    include Pundit
    rescue_from Pundit::NotAuthorizedError, with: :handle_unauthorized_user
  end 

  def handle_unauthorized_user
    render status: :forbidden, json: { error: t('authorization.denied') }
  end
end
