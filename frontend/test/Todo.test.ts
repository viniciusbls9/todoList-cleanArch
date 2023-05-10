import { test, expect } from 'vitest';
import Todo from "../src/entity/Todo"

test('Should test specific todo', () => {
  expect(1 + 1).toBe(2)
})

test('Should test a todo with toggle', () => {
  const todo = new Todo('A')
  todo.toggleDone()
  expect(todo.description).toBe('A')
  expect(todo.done).toBeTruthy()
  
})

test('Should not create todo with empty description', () => {
  expect(() => new Todo('')).toThrow(new Error('Invalid description'))
  
})