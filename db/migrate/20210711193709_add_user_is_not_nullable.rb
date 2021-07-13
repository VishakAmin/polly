class AddUserIsNotNullable < ActiveRecord::Migration[6.0]
  def change
    change_column_null :polls, :user_id, false
  end
end
