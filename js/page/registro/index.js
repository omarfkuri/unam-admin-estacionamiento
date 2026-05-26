import { DB } from "../../lib/db.js";
import { Auth } from "../../lib/auth.js";
import { formMaker } from "../../lib/formMaker.js";


const db = new DB();
const auth = new Auth(db);

const authLoad = await auth.load();
if (authLoad.hasError)
	alert("No se pudo iniciar la aplicación.")

if (auth.isLoggedIn())
	location.href = "/unam-admin-estacionamiento/principal/";

formMaker(
	[
		{
			label: "Nombre",
			placeholder: "Ej. Juan Carlos",
			name: "firstName",
			type: "text",
			required: true
		},
		{
			label: "Apellidos",
			placeholder: "Ej. Gonzalez Rojas",
			name: "lastName",
			type: "text",
			required: true
		},
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
	"registroForm",
	async (fields) => {

		if (fields.firstName == null || fields.firstName.length == 0)
		{
			alert("Ingresa un nombre válido.");
			return false;
		}

		if (fields.lastName == null || fields.lastName.length == 0)
		{
			alert("Ingresa unos apellidos válidos.");
			return false;
		}

		if (fields.workerID == null || fields.workerID.length == 0)
		{
			alert("Ingresa uno número de empleado válido.");
			return false;
		}

		if (fields.password == null || fields.password.length < 8
			|| fields.password.length > 16)
		{
			alert("Ingresa una contraseña entre 8 y 16 caracteres.");
			return false;
		}
		
		const result = await db.createUser(
			fields.firstName,
			fields.lastName,
			fields.workerID,

			fields.password
		);

		if (result.hasError)
		{
			alert("No se pudo crear el usuario.");
			console.error(result.error);

			return false;
		}
		
		alert("El usuario se ha creado correctamente.");
		return true;
	}
)