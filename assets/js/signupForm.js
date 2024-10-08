import { auth } from "./firebase.js";
//Autenticación
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  //Evitar que se recargue la pagina
  e.preventDefault();
  console.log("Formulario enviado");

  //Obtenemos los datos del formulario mediante sus id
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  //Manejo de errores
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //Mostrar mensaje de exito
    showMessage("Usuario registrado", "success");

    //Cerrar el modal
    const signupModal = document.querySelector("#signup-modal");
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    //Limpiamos el formulario
    signUpForm.reset();
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
