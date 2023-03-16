import { Todo } from "../todos/models/todo.models";

const Filters = {
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
  console.log(state);
  console.log("init store 😛");
};

const loadStore = () => {
  throw new Error("not implemented");
};

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
};

const toogleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }

    return todo;
  });
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
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
