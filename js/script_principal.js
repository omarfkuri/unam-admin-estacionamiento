

const email = localStorage.getItem("usuario");

if (!email)
{
    location.href = "/";
}

const usuarioBox = document.querySelector("#usuarioBox");
usuarioBox.innerHTML = email;

function cerrarSesion()
{
    localStorage.removeItem("usuario");
    location.href = "/";
}

const cerrarSesionBtn = document.querySelector("#cerrarSesionBtn");
cerrarSesionBtn.addEventListener("click", cerrarSesion);