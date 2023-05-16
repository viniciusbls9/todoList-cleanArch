import { useHttpClient } from "@context/HttpClientContext";
import TodoList from "./entity/TodoList";
import { useEffect, useState } from "react";
import { TodoListComponent } from "@components/TodoListComponent";

export const App = () => {
  const { todosGateway } = useHttpClient();
  const [total, setTotal] = useState(0);
  const [todoList, setTodoList] = useState(new TodoList(setTotal));
  const [completed, setCompleted] = useState(0);

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
    <TodoListComponent
      total={total}
      completed={completed}
      todoList={todoList}
    />
  );
};
