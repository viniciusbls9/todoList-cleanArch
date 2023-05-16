import TodoList from "../src/entity/TodoList"
import { test, expect } from 'vitest'

test('Should create empty todo list', () => {
  const todoList = new TodoList()
  expect(todoList.getTotal()).toBe(0)
  expect(todoList.getCompleted()).toBe(0)
})

test('Should create todo list with two todos and one completed', () => {
  const todoList = new TodoList()
  todoList.addTodo('A')
  todoList.addTodo('B')
  todoList.todos[1].toggleDone()
  expect(todoList.getTotal()).toBe(2)
  expect(todoList.getCompleted()).toBe(50)
})

test('Should create todo list that cannot create duplicated items', () => {
  const todoList = new TodoList()
  todoList.addTodo('A')
  todoList.addTodo('A')
  expect(todoList.getTotal()).toBe(1)
  expect(todoList.getCompleted()).toBe(0)
})