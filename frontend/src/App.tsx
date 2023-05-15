import { useHttpClient } from "@context/HttpClientContext";
import TodoList from "./entity/TodoList";
import { useEffect, useState } from "react";

export const App = () => {
  const { todosGateway } = useHttpClient();
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [completed, setCompleted] = useState(0)

  let todoList: any;
  useEffect(() => {
    const fetchData = async () => {
      todoList = new TodoList()
      const todosData = await todosGateway.getTodos();
      setData(todosData)
      todoList.addTodos(todosData);
      setTotal(todoList.getTotal())
      setCompleted(todoList.getCompleted())
    }

    fetchData()
  }, [])

  return (
    <div>
      <p>todo: {JSON.stringify(data)}</p>
      <div>Total: {total}</div>
	    <div>Completed: {completed}%</div>
    </div>
  );
};