import { DB } from "../../lib/db.js";
import { formMaker } from "../../lib/formMaker.js";


const db = new DB();
const form = document.querySelector("form");

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
	form,
	async (fields) => {
		
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
		}
		else
		{
			alert("El usuario se ha creado correctamente.")
		}
	}
)