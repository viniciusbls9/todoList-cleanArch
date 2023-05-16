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
