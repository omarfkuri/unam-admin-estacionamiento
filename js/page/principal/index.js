import { DB } from "../../lib/db.js";
import { Auth } from "../../lib/auth.js";


const db = new DB();
const auth = new Auth(db);

const authLoad = await auth.load();
if (authLoad.hasError)
	alert("No se pudo iniciar la aplicación.")

if (!auth.isLoggedIn())
	location.href = "/unam-admin-estacionamiento/";

const user = auth.currentUser;
const usuarioBox = document.getElementById("usuarioBox");

usuarioBox.innerText = `${user.first_name} ${user.last_name}`;

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

const carsResult = await db.getUserCars(auth.currentUser.id);

const carIDs = carsResult.data.map(({id}) => id)
const spacesResult = await db.getSpaces(carIDs);

const carDisplay = document.getElementById("carDisplay");

if (carsResult.data.length == 0)
{
	carDisplay.innerText = "No tiene vehículos registrados.";
}
else
	carsResult.data.map(car => {

		const carBox = document.createElement("div");
		
		const occupied = spacesResult.data
		.find(({current_car_id}) => car.id === current_car_id);

		carBox.innerHTML = `

		<div class="car card ${ occupied ? "occupied" : "" }">
			<div class="car-top">
				<div class="car-title">
					<span class="car-model">${car.model}</span>
					<span class="car-color">${car.color}</span>
				</div>
				<div class="car-subtitle">
					<div class="car-brand">${car.brand}</div>
					<div class="car-plate">${car.plate}</div>
				</div>
			</div>
			<div class="car-bottom">
				${
					occupied
					? `
						Estacionamiento ${occupied.park_number},
						Lugar ${occupied.space_number}
						`
					: `
						No estacionado
						`
				}
			</div>
		</div>

		`;

		carDisplay.append(carBox);

	})