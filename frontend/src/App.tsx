import { useHttpClient } from "@context/HttpClientContext";
import TodoList from "./entity/TodoList";
import { useEffect, useState } from "react";
import { TodoListComponent } from "@components/TodoListComponent";
import Observer from "@infra/observe/Observer";

export const App = () => {
  const { todosGateway } = useHttpClient();
  const [todoList, setTodoList] = useState(new TodoList());
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await todosGateway.getTodos();
      todoList.addTodos(todosData);
      setTodoList(todoList);
      setTotal(todoList.getTotal());
      setCompleted(todoList.getCompleted());

      todoList.on(
        new Observer("add-todo", function () {
          setTotal(todoList.getTotal());
        })
      );
      todoList.on(
        new Observer("delete-todo", async function (todo: any) {
          console.log(todoList.todos);
        })
      );
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
