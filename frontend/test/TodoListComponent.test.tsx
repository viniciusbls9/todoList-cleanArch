import { test, expect } from "vitest";
import TodoList from "../src/entity/TodoList";
import React from "react";
import { TodoListComponent } from "../src/components/TodoListComponent";
import { render } from "@testing-library/react";
test("Should create empty todo list", async () => {
  const props = {
    total: 1,
    completed: 0,
    todoList: new TodoList(),
  };
  const { findByRole } = render(<TodoListComponent {...props} />);
  expect(await findByRole("heading", { name: "Total: 1" })).toBeInTheDocument();
  expect(
    await findByRole("heading", { name: "Completed: 0%" })
  ).toBeInTheDocument();
});
