class UserControlle < ActionController

  def index
    users = User.all.as_json(only: %i[id first_name last_name])
    render status: :ok, json: { users: users }
  end

  def create
  end
end