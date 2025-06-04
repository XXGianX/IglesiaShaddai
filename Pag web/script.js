
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Login
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "inventario.html";
    })
    .catch((error) => {
      document.getElementById("login-error").textContent = "Credenciales incorrectas.";
    });
};

const tabla = document.getElementById("tabla-body");
const formulario = document.getElementById("formulario");

function cargarDatos() {
  getDocs(collection(db, "inventario")).then((snap) => {
    tabla.innerHTML = "";
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${data.nombre}</td>
        <td>${data.descripcion}</td>
        <td>${data.cantidad}</td>
        <td>${data.valor}</td>
        <td>${data.categoria}</td>
        <td>${data.ubicacion}</td>
        <td>${data.estado}</td>
        <td>${data.responsable}</td>
        <td>${data.tipoCompra}</td>
        <td>
          <button onclick="editar('${docSnap.id}')">Editar</button>
          <button onclick="eliminar('${docSnap.id}')">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  });
}

window.editar = async function (id) {
  const ref = doc(db, "inventario", id);
  const snap = await getDocs(collection(db, "inventario"));
  const item = snap.docs.find((d) => d.id === id).data();
  Object.keys(item).forEach((key) => {
    const input = document.getElementById(key);
    if (input) input.value = item[key];
  });
  formulario.onsubmit = async (e) => {
    e.preventDefault();
    const nuevo = {};
    formulario.querySelectorAll("input").forEach((i) => {
      nuevo[i.id] = i.value;
    });
    await updateDoc(ref, nuevo);
    cargarDatos();
    limpiarFormulario();
    formulario.onsubmit = guardar;
  };
};

window.eliminar = async function (id) {
  await deleteDoc(doc(db, "inventario", id));
  cargarDatos();
};

window.limpiarFormulario = function () {
  formulario.reset();
};

function guardar(e) {
  e.preventDefault();
  const nuevo = {};
  formulario.querySelectorAll("input").forEach((i) => {
    nuevo[i.id] = i.value;
  });
  addDoc(collection(db, "inventario"), nuevo).then(() => {
    cargarDatos();
    limpiarFormulario();
  });
}

if (formulario) {
  formulario.onsubmit = guardar;
  cargarDatos();
}
