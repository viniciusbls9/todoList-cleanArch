import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodosGateway from '../src/infra/gateway/TodosGateway.js'
import { App } from '../src/App'
import React from 'react';

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('Should render initial todo list', async () => {
  const { findByRole } = render(<App />)

  // await sleep(100)
  expect(await findByRole('heading', { name: 'Total: 1' })).toBeInTheDocument()
  expect(await findByRole('heading', { name: 'Completed: 0%' })).toBeInTheDocument()
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