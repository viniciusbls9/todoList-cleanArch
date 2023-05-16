import { useHttpClient } from "@context/HttpClientContext";
import TodoList from "./entity/TodoList";
import { useEffect, useState } from "react";

export const App = () => {
  const { todosGateway } = useHttpClient();
  const [total, setTotal] = useState(0);
  const [todoList, setTodoList] = useState(new TodoList(setTotal));
  const [completed, setCompleted] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await todosGateway.getTodos();
      todoList.addTodos(todosData);
      setTodoList(todoList);
      setTotal(todoList.getTotal());
      setCompleted(todoList.getCompleted());
    };

    fetchData();
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
