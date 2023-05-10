import { mount } from '@vue/test-utils'
import TodoList from '../src/entity/TodoList'
import TodoListComponentVue from '../src/components/TodoListComponent.vue'

test('Should create empty todo list', async () => {
  const todoList = new TodoList()
  todoList.addTodo('My first todo')
  const wrapper = mount(TodoListComponentVue, {
    props: {
      todoList
    }
  })
  expect(wrapper.get('.total').text()).toBe('Total: 1')
  expect(wrapper.get('.completed').text()).toBe('Completed: 0%')
})

test('Should not let insert duplicated todo list', async () => {
  const todoList = new TodoList()
  todoList.addTodo('My first todo')
  const wrapper = mount(TodoListComponentVue, {
    props: {
      todoList
    }
  })
  await wrapper.get('.todo-description-input').setValue('A')
  await wrapper.get('.add-todo-button').trigger('click')
  await wrapper.get('.todo-description-input').setValue('A')
  await wrapper.get('.add-todo-button').trigger('click')

  expect(wrapper.get('.total').text()).toBe('Total: 2')
  expect(wrapper.get('.completed').text()).toBe('Completed: 0%')
})