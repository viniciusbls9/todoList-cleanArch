import { mount } from '@vue/test-utils'
import AppVue from '../src/App.vue'
import TodosGateway from '../src/infra/gateway/TodosGateway'

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('Should create empty todo list', async () => {
  const todosGateway: TodosGateway = {
    async getTodos (): Promise<any> {
      return [

        { description: 'My first todo', done: false }
      ]
    }
  }

  const wrapper = mount(AppVue, {
    global: {
      provide: {
        todosGateway
      }
    }
  })
  await sleep(100)
  expect(wrapper.get('.total').text()).toBe('Total: 1')
  expect(wrapper.get('.completed').text()).toBe('Completed: 0%')
})

test('Should not let insert duplicated todo list', async () => {
  const todosGateway: TodosGateway = {
    async getTodos (): Promise<any> {
      return [

        { description: 'My first todo', done: false }
      ]
    }
  }

  const wrapper = mount(AppVue, {
    global: {
      provide: {
        todosGateway
      }
    }
  })
  await sleep(100)
  await wrapper.get('.todo-description-input').setValue('A')
  await wrapper.get('.add-todo-button').trigger('click')
  await wrapper.get('.todo-description-input').setValue('A')
  await wrapper.get('.add-todo-button').trigger('click')

  expect(wrapper.get('.total').text()).toBe('Total: 2')
  expect(wrapper.get('.completed').text()).toBe('Completed: 0%')
})