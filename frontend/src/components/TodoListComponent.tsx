import TodoList from "entity/TodoList";
import { useState } from "react";

interface TodoListComponent {
  total: number;
  completed: number;
  todoList: TodoList;
}

export const TodoListComponent = ({
  total,
  completed,
  todoList,
}: TodoListComponent) => {
  const [description, setDescription] = useState("");

  return (
    <div>
      <h2>Total: {total}</h2>
      <h2>Completed: {completed}%</h2>

      <input
        role="input"
        type="text"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="add-todo-button"
        onClick={() => todoList.addTodo(description)}
      >
        Add
      </button>
    </div>
  );
};
