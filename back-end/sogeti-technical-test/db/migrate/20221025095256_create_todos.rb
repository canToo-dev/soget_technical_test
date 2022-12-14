class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :title, presence: true, allow_blank: false
      t.text :description
      t.boolean :checked
      t.timestamps
    end
  end
end
