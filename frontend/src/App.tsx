import { useHttpClient } from "@context/HttpClientContext";
import TodoList from "./entity/TodoList";
import { useEffect, useState } from "react";

export const App = () => {
  const { todosGateway } = useHttpClient();
  const [total, setTotal] = useState(0)
  const [completed, setCompleted] = useState(0)

  let todoList: any;
  useEffect(() => {
    const fetchData = async () => {
      todoList = new TodoList()
      const todosData = await todosGateway.getTodos();
      todoList.addTodos(todosData);
      setTotal(todoList.getTotal())
      setCompleted(todoList.getCompleted())
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Total: {total}</h2>
	    <h2>Completed: {completed}%</h2>
    </div>
  );
};