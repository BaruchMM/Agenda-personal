/* ENTORNO DEL USUARIO*/
class UI {
  showForm(){
    const mostrar = document.getElementById('editor');
    const elemento_mostrado = document.createElement("div",{id: "mostrar"});
    elemento_mostrado.innerHTML=`
    <div class="card-body" id='formTask'>
      <!-- FORM TO ADD TASKS -->
      <form>
        <div class="form-group">
          <input type="text" id="title" placeholder="Añade un título" class="form-control">
        </div>
        <div class="form-group">
          <textarea id="description" cols="30" rows="10" class="form-control" placeholder="Describe la tarea"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Save</button>
      </form>
    </div>
    `
    mostrar.appendChild(elemento_mostrado);
  }

  editingElement(description,title,j){
    const edit = document.getElementById('editor');
    while (edit.hasChildNodes()) {
      edit.removeChild(edit.firstChild);
    }
    const i = j;
    const elemento_editado = document.createElement("div");

    elemento_editado.innerHTML=`
    <div class="card-body" id='formTask'>
      <!-- FORM TO ADD TASKS -->
      <form>
        <div class="form-group">
          <input type="text" id="titleEdit" class="form-control" value="${title}">
        </div>
        <div class="form-group">
          <textarea id="descriptionEdit" cols="30" rows="10" class="form-control" >${description}</textarea>
        </div>
        <button onclick="saveEdit(${i})" class="btn btn-primary btn-block">Save Edit</button>
      </form>
    </div>
    `
    edit.appendChild(elemento_editado);
  }
}


localStorage.setItem('procesoDeEdicon',JSON.stringify(0));
/* DECLARACIÓN DE FUNCIONES*/
function saveTask(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  console.log(description)

  const task = {
    title,
    description
  };
  if (localStorage.getItem('tasks') === null){
    let tasks=[]
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  localStorage.setItem('task',JSON.stringify(tasks));
  localStorage.getItem('task')
  console.log(task)

  e.preventDefault();

  getTasks(); /*Agrega el elemento recien guardado en la exposición*/
}
/* JSON.parse transforma de string a valor y
JSON.stringify transforma de valor a texto JSON */

function getTasks(){

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');

  tasksView.innerHTML = ''; /* insertar en HTML, en este caso se limpia*/
/* for ( let contador = 0 ; condicion ; contador ++) */

/*para agregar  mientras se recorre el índice se usa +=*/
  for (let i=0 ; i<tasks.length; i++){
    let j=i;
    let title =tasks[i].title;
    let description = tasks[i].description;
    tasksView.innerHTML += `<div class="card mb-2">
      <div class="card-body">
        <p>${title}  - ${description}</p>
        <a class="btn btn-danger" onclick="deleteTask('${title}')" ml-5>
          Eliminar
        </a>
        <a class="btn btn-info" onclick="editTask('${j}')">Editar</a>
      </div>
    </div>`
    localStorage.setItem('contador',JSON.stringify(j));
  }
}


function editTask(j){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(j);
  let descriptionEdit = document.getElementById('descriptionEdit');
  console.log(tasks);
  const ui = new UI;
  localStorage.setItem('descriptionEdit',JSON.stringify(tasks[j].description));
  localStorage.setItem('titleEdit',JSON.stringify(tasks[j].title));
  let procesoDeEdicon=1
  localStorage.setItem('procesoDeEdicon',JSON.stringify(1));
  ui.editingElement(description,title,j);
}

function saveEdit(j){
  let newDescription = document.getElementById('descriptionEdit').value;
  let newTitle = document.getElementById('titleEdit').value;
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[j].description = newDescription;
  tasks[j].title = newTitle;
  console.log(tasks[j]);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function taskAdded(){

  let title =tasks[i].title;
  let description = tasks[i].description;
  tasksView.innerHTML +=`<div class="card mb-2">
    <div class="card-body">
      <p>${title}  - ${description}</p>
      <h2>Tarea agregada exitosamente</h2>
    </div>
  </div>`
}
function deleteTask(title){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();

}


/*APLICACION DEL ENTORNO*/

procesoDeEdicon = JSON.parse(localStorage.getItem('procesoDeEdicon'));
let description = JSON.parse(localStorage.getItem('descriptionEdit'));
let title = JSON.parse(localStorage.getItem('titleEdit'));
const ui = new UI;
if (procesoDeEdicon == 1){
  ui.editingElement(description,title);
} else {
  ui.showForm();
}





document.getElementById('formTask').addEventListener('submit',saveTask);
document.getElementById('formTask').addEventListener('click',saveEdit);


const direccion = window.location.pathname

if (direccion.includes('formulario.html') == true){
  getTasks();
}
if (direccion.includes('Edit.html') == true){
  editing();
}


let looker = document.getElementById('looker')
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://lookerstudio.google.com/embed/reporting/c26404e3-292b-439d-b157-dbca166783cf/page/p_u5yiyboe3c", false);
console.log(xhr.response)
setTimeout(() => {
  xhr.responseType = "arraybuffer";
  xhr.onload = (e)=> {
    let blob = new Blob([xhr.response]);
    let url = URL.createObjectURL(blob);
    console.log(url)
    looker.src = url; 
  }
}, 5000);