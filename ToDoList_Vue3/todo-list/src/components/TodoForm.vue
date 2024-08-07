<template>
  <div class="add-container">
    <input
        class="add-input"
        v-model="newTodoText"
        @keyup.enter="handleAddTodo"
        placeholder="Add a new task"
    />
    <TodoButton class="add-btn" @click="handleAddTodo">Add</TodoButton>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {addTodo} from '@/services/todoServices';
import TodoButton from "@/components/TodoButton.vue";

const newTodoText = ref('');

const handleAddTodo = async () => {
  if (newTodoText.value.trim()) {
    try {
      await addTodo(newTodoText.value);
      newTodoText.value = ''; // Очищення поля вводу після додавання
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
};

</script>

<style scoped>
.add-container {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
}

.add-input {
  margin-right: 16px;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 1px solid #4d4d4d;
  border-radius: 2px;
  font-size: 18px;
}

.add-btn {
  max-width: 64px;
  width: 100%;
  height: 56px;
  border: 1px solid #4d4d4d;
  color: #4d4d4d;
  font-weight: 500;
}
</style>
