# ⚙️ RePlay: Tienda de Segunda Mano (Backend)

> **Live Demo:** [Ver Aplicación Desplegada en AWS Amplify](https://main.d30682b0n15jlt.amplifyapp.com/) 🚀

Este repositorio contiene el código *backend* de **Replay**, la API RESTful encargada de gestionar la lógica de negocio, la base de datos y la comunicación de datos para la aplicación web de segunda mano.

El servidor está construido con **Node.js** y **Express**, y utiliza **MongoDB** como base de datos NoSQL para un modelado de datos flexible y escalable.

---

## 🔗 Enlaces del Proyecto

Este proyecto se divide en dos repositorios:

* **🖥️ Frontend:** [Ir al Repositorio del Backend](https://github.com/JKTrick75/Replay_Projecte1av_Frontend) - Interfaz de usuario (React + Vite).
* **⚙️ Backend API (Este repositorio) :** Servidor Node.js/Express + MongoDB.

---

## 🚀 Tecnologías Utilizadas

### Backend Core
* **Node.js:** Entorno de ejecución para JavaScript en el servidor.
* **Express:** Framework web para la creación de la API REST y gestión de rutas.
* **Mongoose:** ODM (Object Data Modeling) para modelar y gestionar los datos de MongoDB.
* **CORS:** Middleware para permitir peticiones cruzadas desde el cliente React.

### Infraestructura y Datos
* **MongoDB Atlas:** Base de datos en la nube (DaaS) distribuida.
* **AWS Elastic Beanstalk:** Servicio utilizado para el despliegue y escalado del servidor en producción.

---

## ✨ Características de la API

Esta API proporciona los *endpoints* necesarios para que el frontend funcione, gestionando las relaciones entre las distintas entidades del negocio:

* **Gestión de Productos (Juegos):**
    * **CRUD Completo:** Crear, Leer, Actualizar y Borrar videojuegos.
    * **Filtrado Avanzado:** Lógica específica para filtrar juegos por **Consola** (ID específico) o por **Marca** (buscando todas las consolas asociadas a una marca y luego los juegos de esas consolas).
    * **Relaciones N:M:** Gestión del array de `consolas_disponibles` para cada juego.
* **Gestión de Catálogo (Consolas y Marcas):**
    * **Endpoints de Lectura:** Para poblar los selectores y filtros del frontend.
    * **Relaciones 1:N:** Vinculación de cada consola a su marca correspondiente.
* **Seguridad y Conectividad:**
    * Configuración de **CORS** para permitir acceso seguro desde el dominio de producción (AWS Amplify / CloudFront).
    * Conexión segura a MongoDB Atlas mediante driver nativo.

---

## 📦 Instalación y Puesta en Marcha

Si quieres ejecutar este servidor en tu máquina local para desarrollo, sigue estos pasos:

1.  **Clona este repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO_BACKEND]
    ```
2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd nombre-del-proyecto-backend
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Configuración de Base de Datos:**
    * Asegúrate de que tu IP actual está permitida en el *Network Access* de MongoDB Atlas.
    * El archivo `index.js` contiene la cadena de conexión. Verifica que las credenciales sean correctas para el entorno de desarrollo.

5.  **Inicia el servidor:**
    ```bash
    node index.js
    ```
    *(Deberías ver un mensaje en consola indicando: "Servidor escuchando en puerto 8080" y "Conectado a MongoDB Atlas").*

---

## 🔌 Estructura de Endpoints Principales

La API expone las siguientes rutas base:

| Ruta | Métodos | Descripción |
| :--- | :--- | :--- |
| `/juego` | GET, POST, PUT, DELETE | Gestión principal de videojuegos. Soporta *query params* (`?consola=ID`, `?marca=ID`). |
| `/consola` | GET | Listado de consolas disponibles. |
| `/marca` | GET | Listado de marcas y fabricantes. |

---

## 🎓 Contexto

Este proyecto ha sido desarrollado por **David Martínez Borderia**, como parte de la asignatura de Proyecto Intermodular del 2º año de Desarrollo de Aplicaciones Web (1a AV).
