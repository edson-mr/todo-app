export const pintarTodo = ({descripcion, done, id}) => {

    const container= document.createElement("div");
  const html = `
     <li class="${done ? "completed" : ""}" data-id="${id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked':''}>
            <label>${descripcion}</label>
            <button class="destroy"></button>
         </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    container.innerHTML=html;

    return container.firstElementChild;

    
};
