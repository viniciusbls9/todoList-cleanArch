import { useHttpClient } from "@context/HttpClientContext";
import TodoList from "./entity/TodoList";
import { useEffect, useState } from "react";
import { TodoListComponent } from "@components/TodoListComponent";

export const App = () => {
  const { todosGateway } = useHttpClient();
  const [todoList, setTodoList] = useState(new TodoList());

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await todosGateway.getTodos();
      todoList.addTodos(todosData);
      setTodoList(todoList);
    };

    fetchData();
  }, []);

  return <TodoListComponent todoList={todoList} />;
};
