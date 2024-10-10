import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");

//VARIABLES PARA LA EDICIÓN
let editStatus = false;
let editId = "";
//----------------------
export const setupTasks = () => {
  //CREATE
  taskForm.addEventListener("submit", async (e) => {
    //Prevenir que la pagina se recargue
    e.preventDefault();

    //Obtener los datos del formulario
    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    //Crear una nueva tarea
    try {
      if (!editStatus) {
        //Crear tarea
        await createTask(title, description);
        //Mostrar mensaje de éxito
        showMessage("Tarea creada", "success");
        //Limpiar el formulario
      } else {
        //Actualizar tarea
        await updateTask(editId, { title, description });
        //Mostrar mensaje con éxito
        showMessage("Tarea actualizada", "success");

        // Cambiar el estado de edición
        editStatus = false;
        // Cambiar el id de edición
        editId = "";

        // Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML =
          "Agregar una nueva tarea";
        taskForm["btn-agregar"].value = "Crear tarea";
      }

      taskForm.reset();
    } catch (error) {
      //Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });

  //READDDDDDDDDDDDDDDD
  onGetTask((querySnapshot) => {
    let tasksHtml = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      tasksHtml += `
      <article class="task-container border border-2 rounded-2 p-3 my-3">
        <header class="d-flex justify-content-between">
          <h4>${data.title}</h4>
          <div>
          <button class="btn btn-info btn-editar" data-id="${doc.id}"><i class="bi bi-pencil"></i> Editar</button>
            <button class="btn btn-danger btn-eliminar" data-id="${doc.id}"><i class="bi bi-trash"></i> Eliminar</button>
            </div>
        </header>
        <hr />
        <p>${data.description}</p>
      </article>
      `;
    });

    //Mostrar las tareas en el DOM
    tasksContainer.innerHTML = tasksHtml;

    //UPDATEEEEEEEEEEEEEEEEE
    //Obtenemos los botones de eliminar
    const btnsEditar = document.querySelectorAll(".btn-editar");

    //Iteramos sobre cada boton
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        //Obtenemos el documento
        const doc = await getTask(dataset.id);
        //Obtenemos los datos
        const task = doc.data();
        //Llenamos el formulario con los datos
        taskForm["title"].value = task.title;
        taskForm["description"].value = task.description;

        //Actualizamos el estadp de edición y el id edición
        editStatus = true;
        editId = doc.id;

        //Cambiamos lo que muestra el formularip
        document.getElementById("form-title").innerHTML = "Editar tarea";
        taskForm["btn-agregar"].value = "Guardar cambios";
      });
    });

    //DELETEEEEEEEEEEEEEEEEE
    //Obtenemos los botones de eliminar
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    //Iteramos sobre cada boton
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        showMessage("Tarea eliminada", "success");
      });
    });
  });
};
