import Todo from "../src/entity/Todo"

test('Should test specific todo', () => {
  const todo = new Todo('A')
  expect(todo.description).toBe('A')
  expect(todo.done).toBeFalsy()
})

test('Should test a todo with toggle', () => {
  const todo = new Todo('A')
  todo.toggleDone()
  expect(todo.description).toBe('A')
  expect(todo.done).toBeTruthy()
  
})