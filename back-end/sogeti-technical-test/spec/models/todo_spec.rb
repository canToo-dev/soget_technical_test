require 'rails_helper'

RSpec.describe Todo, type: :model do
  context "todos" do 
    it "should persist a todo" do
      todo = Todo.create(title: "Test_1")
      expect(todo.title).to eq "Test_1"
    end
    it "should'nt persist a todo if its title is blank" do
      todo = Todo.create(title: "")
      expect(todo.id).to eq nil
    end
    it "should persist a todo even if its description is blank" do
      todo = Todo.create(title: "Test_2")
      expect(todo.title).to eq "Test_2"
    end
  end
end
