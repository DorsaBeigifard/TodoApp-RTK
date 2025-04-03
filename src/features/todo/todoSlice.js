// add toggle delete locally

// remote: json-server http://localhost:5000  -> ASYNC action

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" }); // a new instance of axios

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/todos", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodos = createAsyncThunk(
  "todos/addAsyncTodos",
  async (paylaod, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/todos", {
        title: paylaod.title,
        id: Date.now(),
        completed: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncTodos = createAsyncThunk(
  "todos/deleteAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`);
      return { id: payload.id }; //when fullfiled this goes to action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodos = createAsyncThunk(
  "todos/toggleAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/todos/${payload.id}`, {
        //patch vs put?
        //send these too
        completed: payload.completed,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state) => {
        state.loading = true;
        state.todos = [];
        state.error = "";
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todos = [];
      })

      //to add todos
      .addCase(addAsyncTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })

      .addCase(deleteAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(
          (todo) => todo.id !== Number(action.payload.id)
        );
      })

      .addCase(toggleAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        const selectedTodo = state.todos.find(
          (todo) => todo.id === Number(action.payload.id)
        );
        selectedTodo.completed = action.payload.completed;
      });
  },
});

export default todoSlice.reducer;
