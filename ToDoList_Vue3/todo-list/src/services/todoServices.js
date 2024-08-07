import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

export const fetchTodos = (callback) => {
    if (typeof callback !== 'function') {
        throw new Error('Callback is not a function');
    }

    return onSnapshot(collection(db, 'todos'), (snapshot) => {
        const todosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(todosList);
    }, (error) => {
        console.error('Error fetching todos:', error);
    });
};

// Функція для додавання нової задачі
export const addTodo = async (todoText) => {
    if (todoText.trim()) {
        try {
            const newTodo = { text: todoText, completed: false };
            await addDoc(collection(db, 'todos'), newTodo);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }
};

// Функція для оновлення задачі
export const updateTodo = async (updatedTodo) => {
    try {
        const todoDoc = doc(db, 'todos', updatedTodo.id);
        await updateDoc(todoDoc, updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
    }
};

// Функція для видалення задачі
export const deleteTodo = async (id) => {
    try {
        const todoDoc = doc(db, 'todos', id);
        await deleteDoc(todoDoc);
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};
