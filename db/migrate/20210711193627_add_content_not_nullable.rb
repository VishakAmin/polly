class AddContentNotNullable < ActiveRecord::Migration[6.0]
  def change
    change_column_null :options, :content, false
  end
end
