<template>
  <li class="todo-item">
    <div class="todo-item__box">
      <TodoCheckbox
          :checked="localTodo.completed"
          @change="toggleCompleted"
      />
      <p class="todo-item__text">{{ localTodo.text }}</p>
    </div>
    <TodoButton class="todo-item__btn" @click="handleDelete">Delete</TodoButton>
  </li>
</template>

<script setup>
import {ref, watch} from 'vue';
import {defineProps, defineEmits} from 'vue';
import {updateTodo, deleteTodo} from '@/services/todoServices';
import TodoCheckbox from "@/components/TodoCheckbox.vue";
import TodoButton from "@/components/TodoButton.vue";

const props = defineProps({
  todo: Object
});
const emit = defineEmits(['updateTodo', 'deleteTodo']);
const localTodo = ref({...props.todo});

watch(() => props.todo, (newVal) => {
  localTodo.value = {...newVal};
});

const toggleCompleted = async () => {
  const updatedTodo = {...localTodo.value, completed: !localTodo.value.completed};
  await updateTodo(updatedTodo);
  localTodo.value = updatedTodo;
  emit('updateTodo', updatedTodo);
};

const handleDelete = async () => {
  await deleteTodo(localTodo.value.id);
  emit('deleteTodo', localTodo.value.id);
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.todo-item__box {
  display: flex;
  align-items: center;
}
.todo-item__text {
  font-size: 18px;
  color: #4d4d4d;
  font-weight: 500;
}
.todo-item__btn {
  height: 32px;
  max-width: 64px;
  width: 100%;
  border: 1px solid #4d4d4d;
  border-radius: 2px;
  color: #4d4d4d;
  font-weight: 500;
}
</style>
