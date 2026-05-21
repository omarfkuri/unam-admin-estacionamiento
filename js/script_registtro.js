
const { createClient } = supabase;
const db = createClient(
  'https://wozfkkyfflnngrlsefxe.supabase.co',
  'sb_publishable_pZVN0wLj7geqIXl_Az8lkw_jo9rsJyA'
);

const campos =[
    {name: 'nombre', label: 'Ingresa tu nombre', type:'text'},
    {name: 'correo', label: 'Ingresa tu correo', type:'email'},
    {name: 'password', label: 'Ingresa tu contraseña', type:'password'},
    {name: 'edad', label: 'Ingresa tu edad', type:'number'}
]

const contenedor = document.getElementById('contenedorInputs');

campos.forEach((campo) => {
    const label = document.createElement('label');
    label.textContent = campo.label;

    const input = document.createElement('input');
    input.type=campo.type;
    input.name=campo.name;
    input.id=campo.name;

    input.classList.add('entradaTexto');

    contenedor.appendChild(label);
    contenedor.appendChild(input);
})

document.getElementById('btnRegistrar').addEventListener('click', async ()=>{
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const edad = document.getElementById('edad').value;

    const {data,error} = await db
        .from('usuario')
        .insert([{nombre,correo,password,edad,id_rol:2}]);
    if(error){
        alert('Ocurrió un error al registrar al usuario');
    }else{
        alert('Usuario registrado correctamente');
    }
})