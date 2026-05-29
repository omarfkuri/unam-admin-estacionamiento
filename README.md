# EasyPark
EasyPark es una aplicación para gestionar estacionamientos
de una manera eficiente, confiable y segura. Permite a usuarios de
estacionamientos conocer información sobre sus vehículos
registrados y lugares usados, a los administradores les brinda
la capacidad de mantener control de los vehículos, lugares y usuarios,
y a los observadores les permite observar gráficas de uso.


Visible en el siguiente [link](https://omarfkuri.github.io/unam-admin-estacionamiento/).
---
## Tecnologías utilizadas
Este proyecto está construido con HTML, CSS y JavaScript (Vanilla).
Despliegue utilizando GitHub Pages y base de datos con Supabase.
---
## Instalación
Clonar el repo de GitHub:
```
git clone https://github.com/omarfkuri/unam-admin-estacionamiento.git
```
---
## Ejecutar sistema
Para correr el sistema localmente se puede utilizar cualquier
utilidad de preview en vivo, ya sea la incluida en VsCode, o
utilizando la utilidad `reload` disponible a través de NPM.

## Uso del sistema
El sistema permite la creación y manejo de usuarios, así
como la administración de vehículos y lugares de estacionamientos.

### Credenciales de prueba

#### Súper administrador

- Número de empleado: 412909034
- Contraseña: 12345678

#### Administrador

- Número de empleado: 412908392
- Contraseña: 98765432

#### Empleado

- Número de empleado: 412900329
- Contraseña: 82736451
---
## Funcionalidades principales

### Database
La clase `DB` ofrece funcionalidad para comunicarse
con la base de datos. Contiene métodos para crear y
consultar datos.

### Auth
La clase auth se encarga de mantener la sesión actual. 
Utiliza el `localStorage` para mantener un token
vivo en la sesión actual. También consulta la base de
datos para verificar el token actual, así como iniciar
y cerrar sesión.
---
## Evidencias
Indicar dónde se almacenan las capturas, reportes, logs o evidencias generadas.
---
## Estructura del proyecto
El proyecto contiene una carpeta `css` que contiene estilos,
una carpeta `js` que contiene a `lib`, utilidades comunes, y a 
`pages`, lógica específica a cada página. Contiene también una
carpeta assets, y cada página tiene su propia carpeta.
```
unam-admin-estacionamiento/
├── assets
├── css
├── js
│   ├── lib
│   │   ├── auth.js
│   │   ├── db.js
│   │   ├── formMaker.js
│   │   └── result.js
│   └── page
│       ├── index.js
│       ├── principal
│       │		└── index.js
│       └── registro
│           └── index.js
├── principal
│   └── index.html
├── registro
│   └── index.html
└── index.html
```
---
## Notas adicionales
Importante tener un navegador moderno con JavaScript ES6.

## Autores

- Freaner Kuri Omar – **Líder**
- De la Cruz Roque Isaid – **Desarrollador**
- Guerra Córdova Emiliano – **Analista de requerimientos**
- Jarquín Ordaz Ariadna – **Arquitecta de software**
- Lozano Ortiz Karen – **Tester**
- Vargas Pérez Patricia Victoria – **Arquitecta de software**
