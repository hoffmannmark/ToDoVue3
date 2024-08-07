import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCYGWhHRHfzl5QCGe641jr7a3997gVzomM",
    authDomain: "todo-list-c8c49.firebaseapp.com",
    projectId: "todo-list-c8c49",
    storageBucket: "todo-list-c8c49.appspot.com",
    messagingSenderId: "408579456842",
    appId: "1:408579456842:web:0191e72b7986557251cbb3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc };
