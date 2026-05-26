import { DB } from "../lib/db.js";
import { formMaker } from "../lib/formMaker.js";


const db = new DB();
const form = document.querySelector("form");

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
	form,
	async (fields) => {

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
		
		const result = await db.getUserByWorkerIDAndPassword(
			fields.workerID,
			fields.password
		);

		if (result.hasError)
		{
			alert("El usuario o contraseña son incorrectos.");
			console.error(result.error);

			return false;
		}

		return true;
	}
)