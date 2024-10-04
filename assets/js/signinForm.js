import { auth } from "./firebase.js";
//Autenticación
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signInForm = document.querySelector("#signin-form");

signInForm.addEventListener("submit", async (e) => {
  //Evitar que se recargue la pagina
  e.preventDefault();
  console.log("Formulario enviado");

  //Obtenemos los datos del formulario mediante sus id
  const email = signInForm["signin-email"].value;
  const password = signInForm["signin-password"].value;
  //Manejo de errores
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    //Mostrar mensaje de exito
    showMessage("Sesión iniciada", "success");

    //Cerrar el modal
    const signinModal = document.querySelector("#signin-modal");
    const modal = bootstrap.Modal.getInstance(signinModal);
    modal.hide();

    //Limpiamos el formulario
    signInForm.reset();
  } catch (error) {
    //Registro fallido
    console.log(error);
    //Mostrar mensaje de error
    //Si el correo esta en uso
    if (error.code === "auth/email-already-in-use") {
      showMessage("El correo ya esta en uso", "error");
      //Si el correo es invalido
    } else if (error.code === "auth/invalid-email") {
      showMessage("Correo inválido", "error");
      //Si la contraseña es debil
    } else if (error.code === "auth/weak-password") {
      showMessage("La contraseña debe de tener al menos 6 caracteres", "error");
    } else {
      showMessage(error.code, "error");
    }
  }
});
