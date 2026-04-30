function login()
{
    const divMensaje = document.querySelector('#mensaje');
    
    const [
    	{value: email},
    	{value: contraseña},
    ] = document.querySelectorAll('.input-box input');

    if (!email)
    	divMensaje.innerHTML = "Por favor, ingresa un email"
    
    else if (!contraseña)
    	divMensaje.innerHTML = "Por favor, ingresa una contraseña"

    else {
        localStorage.setItem("usuario", email);
    	location.href = "/principal/"
    }
}

const bottonIng = document.getElementById('bottonIng');
bottonIng.addEventListener("click", login);
console.log("added event", bottonIng)