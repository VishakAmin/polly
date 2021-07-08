class Poll < ApplicationRecord
  def change
    create_table :polls do |t|
      t.text :title
      t.timestamps
    end
  end
end
