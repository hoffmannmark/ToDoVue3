<template>
  <div class="main-container">
    <h1 class="main__title">Todo List</h1>
    <TodoForm @addTodo="handleAddTodo"/>
    <TodoList :todos="sortedTodos" @updateTodo="handleUpdateTodo" @deleteTodo="handleDeleteTodo"/>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';
import {addTodo, deleteTodo, updateTodo, fetchTodos} from "@/services/todoServices";

const todos = ref([]);

const handleAddTodo = async (todoText) => {
  try {
    await addTodo(todoText);
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

const handleUpdateTodo = async (updatedTodo) => {
  try {
    await updateTodo(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

const handleDeleteTodo = async (id) => {
  try {
    await deleteTodo(id);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

const sortedTodos = computed(() => {
  return todos.value.slice().sort((a, b) => a.completed - b.completed);
});

onMounted(() => {
  fetchTodos((todosList) => {
    todos.value = todosList;
  });
});
</script>

<style>
.main__title {
  margin-bottom: 16px;
  font-size: 28px;
}
.main-container {
  max-width: 440px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
}
</style>
