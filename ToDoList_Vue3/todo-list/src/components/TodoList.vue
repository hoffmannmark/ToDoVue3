<template>
  <ul>
    <TodoItem
        v-for="todo in props.todos"
        :key="todo.id"
        :todo="todo"
        @updateTodo="handleUpdateTodo"
        @deleteTodo="handleDeleteTodo"
    />
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import TodoItem from './TodoItem.vue';
import { updateTodo, deleteTodo } from '@/services/todoServices';

const props = defineProps({
  todos: Array
});

const emit = defineEmits(['updateTodo', 'deleteTodo']);

// Обробка подій оновлення та видалення
const handleUpdateTodo = async (updatedTodo) => {
  try {
    await updateTodo(updatedTodo);
    emit('updateTodo', updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

const handleDeleteTodo = async (id) => {
  try {
    await deleteTodo(id);
    emit('deleteTodo', id);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};
</script>
