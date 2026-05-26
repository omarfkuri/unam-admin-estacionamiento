import { DB } from "../../lib/db.js";
import { Auth } from "../../lib/auth.js";


const db = new DB();
const auth = new Auth(db);

const authLoad = await auth.load();
if (authLoad.hasError)
	alert("No se pudo iniciar la aplicación.")

if (!auth.isLoggedIn())
	location.href = "/unam-admin-estacionamiento/";


const btn = document.getElementById("cerrarSesionBtn");

btn.onclick = async () =>
{
	const result = await auth.logout();
	
	if (result.hasError)
	{
		alert("No se pudo cerrar la sesión.");
		console.error(result.error);
		return;
	}

	location.href = "/unam-admin-estacionamiento/";
};