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

      <div>
        {todoList.todos.map((todo) => (
          <>
            <div className="todo-description">{todo.description}</div>
            <div style={{ marginBottom: 20 }}> - {String(todo.done)}</div>
            <button onClick={() => todo.toggleDone()}>done/undone</button>
            <button onClick={() => todoList.deleteTodo(todo)}>delete</button>
          </>
        ))}
      </div>

      <input
        role="input"
        type="text"
        style={{ marginTop: 40 }}
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
