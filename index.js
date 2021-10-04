document.getElementById('formTask').addEventListener('submit',saveTask);

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
    let title =tasks[i].title
    let description = tasks[i].description
    tasksView.innerHTML += `<div class="card mb-2">
      <div class="card-body">
        <p>${title}  - ${description}</p>
        <a class="btn btn-danger" onclick="deleteTask('${title}')" ml-5>
          Eliminar
        </a>
      </div>
    </div>`
  }
}
function taskAdded(){
  let title =tasks[i].title
  let description = tasks[i].description
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
getTasks();
