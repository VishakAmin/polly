class AddForeignKeyResponse < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :responses, :users, column: :user_id, on_delete: :cascade
    add_foreign_key :responses, :polls, column: :poll_id, on_delete: :cascade
    add_foreign_key :responses, :options, column: :option_id, on_delete: :cascade
  end
end
