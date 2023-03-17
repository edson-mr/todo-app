import { Todo } from "../todos/models/todo.models";

export const Filters = {
  all: "All",
  pending: "Pending",
  completed: "Completed",
};

const state = {
  todos: [
    new Todo("programar un ecommerce"),
    new Todo("visitar a Copito"),
    new Todo("ir a Casablanca"),
  ],
  filter: Filters.all,
};

const initStore = () => {
  loadStore();
  console.log("init store 😛");
};

const loadStore = () => {
  if(!localStorage.getItem('state')) return;
  const {todos=[], filter=Filters.all} = JSON.parse(localStorage.getItem('state'));

  state.todos=todos;
  state.filter=filter;

};

const saveStateToLocalStorage=()=>{
  localStorage.setItem('state',JSON.stringify(state));
}

const getTodos = (filter = Filters.all) => {
  switch (filter) {
    case Filters.all:
      return [...state.todos];
    case Filters.completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`opción ${filter} no es válido`);
  }
};

const addTodo = (descripcion) => {
  if (!descripcion) throw new Error("la descripción es requerida");
  state.todos.push(new Todo(descripcion));
  saveStateToLocalStorage();
};

const toogleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }

    saveStateToLocalStorage();

    return todo;
  });
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateToLocalStorage();
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStateToLocalStorage();
};

const setFilter = (newFilter = Filters.all) => {
  state.filter = newFilter;
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toogleTodo,
};
