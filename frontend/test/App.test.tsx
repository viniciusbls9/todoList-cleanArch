import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../src/App";
import React from "react";

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

test("Should render initial todo list", async () => {
  const { findByRole } = render(<App />);

  expect(await findByRole("heading", { name: "Total: 1" })).toBeInTheDocument();
  expect(
    await findByRole("heading", { name: "Completed: 0%" })
  ).toBeInTheDocument();
});

test("Should not let insert duplicated todo list", async () => {
  const { findByRole, container } = render(<App />);

  await sleep(100);
  const input = screen.getByRole("input");
  const button = container.getElementsByClassName("add-todo-button")[0];
  fireEvent.change(input, { target: { value: "A" } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: "A" } });
  fireEvent.click(button);

  expect(await findByRole("heading", { name: "Total: 2" })).toBeInTheDocument();
  expect(
    await findByRole("heading", { name: "Completed: 0%" })
  ).toBeInTheDocument();
});
