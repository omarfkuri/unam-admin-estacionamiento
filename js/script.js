function login()
{
    const divMensaje = document.querySelector('#mensaje');
    
    const [
    	{value: usuario},
    	{value: contraseña},
    ] = document.querySelectorAll('.input-box input');

    if (usuario !== "admin")
    	divMensaje.innerHTML = "Usuario incorrecto"
    
    else if (contraseña !== "123")
    	divMensaje.innerHTML = "Contraseña incorrecta"

    else {
        localStorage.setItem("usuario", usuario);
    	location.href = "/principal/"
    }
}

const bottonIng = document.getElementById('bottonIng');
bottonIng.addEventListener("click", login);
console.log("added event", bottonIng)