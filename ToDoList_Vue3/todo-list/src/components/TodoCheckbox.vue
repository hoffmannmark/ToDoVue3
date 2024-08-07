<template>
  <input
      class="todo-item__input"
      type="checkbox"
      :checked="checked"
      @change="$emit('change')"
  />
</template>

<style scoped>
.todo-item__input {
  width: 32px;
  height: 32px;
  margin: 0 16px 0 0;
}
</style>
