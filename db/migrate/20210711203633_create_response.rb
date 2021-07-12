class CreateResponse < ActiveRecord::Migration[6.0]
  def change
    create_table :responses do |t|
      t.integer :user_id, null: false
      t.integer :poll_id, null: false
      t.integer :option_id, null: false
      t.timestamps
    end
  end
end
