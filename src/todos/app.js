import html from './app.html?raw'
import { renderTodos } from './use-cases';
import store, { Filters } from '../store/todo.store';
import { renderPending } from './use-cases/render-pending';

const ElementosId = {
  todoList: ".todo-list",
  newTodoInput: "#new-todo-input",
  clearCompleted: ".clear-completed",
  filtros: ".filtro",
  countPending: "#pending-count",
};

export const App=(elementId)=>{

    const displayTodos=()=>{
        const todos= store.getTodos(store.getCurrentFilter());
        renderTodos(ElementosId.todoList, todos);
        setUpdatePending();
    }

    const setUpdatePending=()=> {
        
        renderPending(ElementosId.countPending);
    }
    (()=>{


        document.querySelector(elementId).innerHTML=html;
        displayTodos();
        
    })();

    //referencias al input html
    const entrada= document.querySelector(ElementosId.newTodoInput);
    const ulList = document.querySelector(ElementosId.todoList);
    const borrarCompletados= document.querySelector(ElementosId.clearCompleted);
    const filtros= document.querySelectorAll(ElementosId.filtros);

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

    borrarCompletados.addEventListener("click",()=>{
        store.deleteCompleted();
        displayTodos();
    });

    filtros.forEach(filtro=>{
       
        filtro.addEventListener("click",(event)=>{
                filtros.forEach(filtro=>filtro.classList.remove("selected"));
                filtro.classList.add("selected");
                switch(event.target.text){
                    case "Todos": store.setFilter(Filters.all); break;
                    case "Pendientes": store.setFilter(Filters.pending); break;
                    case "Completados": store.setFilter(Filters.completed); break;
                }
                displayTodos();
        });
    });
}