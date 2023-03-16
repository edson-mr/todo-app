import html from './app.html?raw'
import { renderTodos } from './use-cases';
import store from '../store/todo.store';

const ElementosId = {
  todoList: ".todo-list",
  newTodoInput: "#new-todo-input",
};

export const App=(elementId)=>{

    const displayTodos=()=>{
        const todos= store.getTodos(store.getCurrentFilter());
        renderTodos(ElementosId.todoList, todos);
    }

    (()=>{


        document.querySelector(elementId).innerHTML=html;
        displayTodos();
        
    })();

    //referencias al input html
    const entrada= document.querySelector(ElementosId.newTodoInput);
    const ulList = document.querySelector(ElementosId.todoList);

    entrada.addEventListener("keyup", (event) =>{
        if(event.keyCode!==13) return;
        if(event.target.value.trim().length === 0) return;
        store.addTodo(event.target.value);
        displayTodos();
        event.target.value='';
    });

    ulList.addEventListener("click",(event)=>{
        
        const todoId = event.target.closest('[data-id]').getAttribute("data-id");
        if(event.target.matches(".destroy")){
             store.deleteTodo(todoId);
        }else{
            store.toogleTodo(todoId);
        }
        displayTodos();
    });
}