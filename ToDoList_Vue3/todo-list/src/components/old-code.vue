<template>
  <div class="main-container">
    <div class="add-container">
      <h1>Todo List</h1>
      <input class="add-input" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task"/>
      <button class="add-btn" @click="addTodo">Submit</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)"/>
        {{ todo.text }}
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <Header />
    <TodoForm @addTodo="addTodo" />
    <TodoList :todos="todos" @updateTodo="updateTodo" />
  </div>
</template>

<script>
import {collection, addDoc, getDocs, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import {db} from '@/firebase';

export default {
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  methods: {
    async addTodo() {
      if (this.newTodo.trim() === '') return;

      try {
        await addDoc(collection(db, 'todos'), {
          text: this.newTodo,
          completed: false
        });
        this.newTodo = '';
        await this.fetchTodos();
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    async fetchTodos() {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      this.todos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    },
    async updateTodo(todo) {
      const todoRef = doc(db, 'todos', todo.id);
      await updateDoc(todoRef, {
        completed: todo.completed
      });
    },
    async deleteTodo(id) {
      const todoRef = doc(db, 'todos', id);
      await deleteDoc(todoRef);
      await this.fetchTodos();
    }
  },
  created() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
  .add-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto 24px;
    position: relative;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    width: 100%;
    margin: 0 auto 24px;
    position: relative;
  }
  .add-input {
    width: 100%;
    margin-bottom: 10px;
    height: 56px;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .add-btn {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
</style>
