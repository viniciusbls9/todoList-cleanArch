<script setup lang="ts">
  import { inject, onMounted, reactive } from 'vue'
  import TodoListComponent from '../components/TodoListComponent.vue';
  import TodosGateway from '../infra/gateway/TodosGateway';
  import TodoList from '../entity/TodoList';

  const todoList: any = reactive(new TodoList());

  onMounted(async () => {
    const todosGateway = inject('todosGateway') as TodosGateway
    const todosData = await todosGateway.getTodos()
    todoList.addTodos(todosData)
  })
</script>

<template>
  <TodoListComponent :todoList="todoList"></TodoListComponent>
</template>

<style scoped>
</style>
