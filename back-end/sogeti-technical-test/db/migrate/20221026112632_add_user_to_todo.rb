class AddUserToTodo < ActiveRecord::Migration[7.0]
  def change

    change_table :todos do |t|
      t.references :user
    end
  end
end
