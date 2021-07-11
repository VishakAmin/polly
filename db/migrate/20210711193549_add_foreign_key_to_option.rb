class AddForeignKeyToOption < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :options, :polls, column: :poll_id, on_delete: :cascade
  end
end
