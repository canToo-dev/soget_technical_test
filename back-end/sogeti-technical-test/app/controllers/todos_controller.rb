class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show update destroy ]
  before_action :authenticate_user!

  # GET /todos
  def index
    @todos = current_user.todos
    render json: @todos
  end

  # GET /todos/1
  def show
    if(@todo.user == current_user)
      render json: @todo
      else
      render json: {
        message: "you don't own this todo."
      }, status: 403
    end
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created, location: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.where(user: current_user).find(params[:id])
      if(@todo == nil)
        render json: {
          message: "you don't own or this does'nt exists todo."
        }, status: 403

      end
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.require(:todo).permit(
        :title,
        :description,
        :checked
      )
    end
end
