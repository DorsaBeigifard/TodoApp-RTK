// add toggle delete locally

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title, // {title: "..."}
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === Number(action.payload.id) //{id}
      );
      selectedTodo.completed = !selectedTodo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== Number(action.payload.id)
      );
    },
  },
});

export default todoSlice.reducer;

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
