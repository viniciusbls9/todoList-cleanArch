import Observer from "@infra/observe/Observer";
import Todo from "entity/Todo";
import TodoList from "entity/TodoList";
import { useEffect, useState } from "react";

interface TodoListComponent {
  todoList: TodoList;
}

export const TodoListComponent = ({ todoList }: TodoListComponent) => {
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setTotal(todoList.getTotal());
    setCompleted(todoList.getCompleted());

    todoList.on(
      new Observer("add-todo", function (todo: Todo) {
        console.log(todo);
        setTotal(todoList.getTotal());
      })
    );
  }, []);
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
