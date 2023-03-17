import todoStore, { Filters } from "../../store/todo.store";

let element;
export const renderPending=(elementId)=>{
    if(!element) element= document.querySelector(elementId);

    element.textContent= todoStore.getTodos(Filters.pending).length;
}