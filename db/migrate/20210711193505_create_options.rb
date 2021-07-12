class CreateOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :options do |t|
      t.string :content
      t.integer :poll_id, null: false
      t.timestamps
    end
  end
end
