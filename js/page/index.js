import { DB } from "../lib/db.js";
import { Auth } from "../lib/auth.js";
import { formMaker } from "../lib/formMaker.js";


const db = new DB();
const auth = new Auth(db);

const authLoad = await auth.load();
if (authLoad.hasError)
	alert("No se pudo iniciar la aplicación.")

if (auth.isLoggedIn())
	location.href = "/unam-admin-estacionamiento/principal/";

const mensaje = document.querySelector("#mensaje");

function showMessage(str)
{
	mensaje.innerText = str;
}

formMaker(
	[
		{
			label: "Número de empleado",
			placeholder: "Ej. 315986657",
			name: "workerID",
			type: "text",
			required: true
		},
		{
			label: "Contraseña",
			placeholder: "De 8 a 16 caracteres",
			name: "password",
			type: "password",
			required: true
		},
	],
	"loginForm",
	async (fields) => {

		if (fields.workerID == null || fields.workerID.length == 0)
		{
			showMessage("Ingresa uno número de empleado válido.");
			return false;
		}

		if (fields.password == null || fields.password.length < 8
			|| fields.password.length > 16)
		{
			showMessage("Ingresa una contraseña entre 8 y 16 caracteres.");
			return false;
		}
		
		const result = await db.getUserByWorkerIDAndPassword(
			fields.workerID,
			fields.password
		);

		if (result.hasError)
		{
			showMessage("El usuario o contraseña son incorrectos.");
			console.error(result.error);

			return false;
		}

		const result2 = await auth.login(result.data.id);

		if (result2.hasError)
		{
			showMessage("No se pudo crear una nueva sesión");
			console.error(result2.error);

			return false;
		}

		location.href = "/unam-admin-estacionamiento/principal/";
		return true;
	}
)