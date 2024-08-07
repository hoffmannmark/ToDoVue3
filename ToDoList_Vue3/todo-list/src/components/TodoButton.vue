<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

function handleClick(event) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
</style>
