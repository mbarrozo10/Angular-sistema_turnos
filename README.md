# Trabajo practico 2.
## Clinica medica

### Funcionamiento:

 Esta aplicacion web funciona segun el tipo de usuario que accedas, cada usuario comparte funcionalidades y a su vez tiene algunas unicas. En concreto hay 3 tipo: administrador, paciente y especialista.

### Funcionalidades generales:

#### Inicio de sesion: 
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20214443.png?alt=media&token=8b793dd0-0204-49e2-a0b9-e51c2ac2a850)

En esta imagen podemos ver el inicio de sesion, el cual cuenta con 6 botones para acceso rapido (el primero de un administrador, 2 y 3 de especialistas y el resto de pacientes) tambien figura un boton para ir al registro


#### Registro:
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20214610.png?alt=media&token=3899621e-7a31-47fe-bad5-8611d8aa905e)

Una vez accedemos al registro tenemos que elegir el tipo de usuario, en la izquierda el especialista y en la derecha el paciente

(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20214718.png?alt=media&token=ec869941-107e-45e9-aa8a-7e61d964c282)

Una vez elegido el formulario que muestra nos enseña los datos necesarios para registrar, estos varian dependiendo del usuario que elijamos, tambien figura un captcha para evitar el acceso a bots.

#### Inicio
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20214904.png?alt=media&token=d5ce5649-1917-4955-8ba6-659f630b20e3)

En el menu principal podemos observar en el rincon izquierdo superior el nombre del usuario iniciado y en el centro las distintas secciones que dependiendo del usuario van a ser distintas

#### Mi Perfil
 (https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20215527.png?alt=media&token=3f082b49-aaa2-49ec-9607-1e807de65789)

Tanto para el administrador como para el especialista solo muestra una imagen y datos como nombre, apellido, correo y tipo de usuario.

### Funcionalidades administrador

#### Turnos
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20215057.png?alt=media&token=8507b8d8-fb58-4415-953c-a93e94e57a24)
Desde aca podemos asignar turnos, siguiendo los pasos:
 - Elegimos la especialidad
 - Elegimos al especialista
 - Elegimos el dia
 - Elegimos el horario
 - Seleccionamos buscar

(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20215358.png?alt=media&token=ab5ffe66-96bd-412a-bf70-d80067e1db5e)

Una vez encontro turnos queda asignar al paciente y darle a "tomar" y el turno quedara pendiente de confirmacion del especialista.

#### Consola admin
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20215620.png?alt=media&token=c07371c2-03ab-4c7a-bbd3-4da8fbb0d80d)

Esta seccion se divide en 2 partes:
 - Por un lado contamos con el listado de usuarios, el cual contiene un boton para podes exportar los datos de los usuarios(excepto la contraseña) a un archivo de excel. Mientras que el listado de abajo contiene los usuarios que al seleccionar el boton donde esta su imagen genera un excel con todos los turnos del mismo.

 - Por el lado derecho contamos con un formulario que nos permite dar de alta pacientes, especialistas y administradores.

 Es importante mencionar que esta seccion es solo accesible con rol de administrador

### Funcionalidades especialista

#### Mis turnos
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20215941.png?alt=media&token=a3011b85-5c61-4393-acf4-a96644d078b8)

Esta seccion se divide en 2 partes:
 - Por un lado contamos con la parde de alta de turnos donde el especialista establece sus horarios, este esta limitado de la siguiente manera: 
   * Solo puede elegir el plazo de 2 semanas, cualquier fecha que supere no sera admitido
   * Los horarios estan establecidos de 8 a 22
   * La duracion de turnos solo puede ser de 1h o 30min
 - Por otro lado estan los turnos del especialista iniciado los cuales pueden aceptarse, cancelar, rechazar y finalizar. Al finalizar un turno nos pide completar un pequeño formulario de historial clinico donde se ingresan los datos de la atencion.
 Esta seccion cuenta con distintos filtros:
   * Especialidad: permite filtrar los turnos por especialidades ingresadas en el sistema
   * Paciente: permite filtrar por los paciente del sistema
   * Estado: permite filtrar por los distintos posibles estados de los turnos
   * Altura: permite filtrar por la altura ingresada en el formulario de historial clinico
   * Peso: permite filtrar por el peso ingresado en el formulario de historial clinico
   * Presion: permite filtrar por la presion ingresada en el formulario de historial clinico
   * Temperatura: permita filtra por la temperatura ingresada en el formulario de historial clinico
   * Clave: esta seccion es un valor especial dependiendo de la especialidad.
   * Cantidad: se relaciona con la seccion de clave, es la cantidad de dias, aumento, caries, etc


#### Pacientes
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20223040.png?alt=media&token=1198b7e9-03dd-4a52-993e-8a8371f754f8)

Esta seccion es exclusiva del especialsita, muestra los pacientes que se antendieron con el al menos 1 vez. En esta seccion podemos ver los ultimos 3 turnos si es que hay.


### Funcionalidades paciente

#### Mis turnos
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20223742.png?alt=media&token=989d0302-b08c-4854-ab6f-dc97949a5c29)

Esta seccion contiene los turnos correspondientes del paciente ingresado, con los siguientes filtros:
   * Especialidad: permite filtrar los turnos por especialidades ingresadas en el sistema
   * Especialista: permite filtrar por los especialistas del sistema
   * Estado: permite filtrar por los distintos posibles estados de los turnos
   * Altura: permite filtrar por la altura ingresada en el formulario de historial clinico
   * Peso: permite filtrar por el peso ingresado en el formulario de historial clinico
   * Presion: permite filtrar por la presion ingresada en el formulario de historial clinico
   * Temperatura: permita filtra por la temperatura ingresada en el formulario de historial clinico
   * Clave: esta seccion es un valor especial dependiendo de la especialidad.
   * Cantidad: se relaciona con la seccion de clave, es la cantidad de dias, aumento, caries, etc
Luego contiene la posibilidad de buscar un nuevo turno

#### Nuevo turno
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20223934.png?alt=media&token=65b7abea-c679-4ae3-9ef7-b2ff77cc7554)
Esta seccion es similar a la del administrador, con la diferencia de que el paciente ya somos nosotros. Realizamos los siguientes pasos:
 - Elegimos la especialidad
 - Elegimos al especialista
 - Elegimos el dia
 - Elegimos el horario
 - Seleccionamos buscar

(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20224050.png?alt=media&token=9987ca75-8371-467d-be75-1f93fa07c116)

Una vez buscado los turnos seleccionamos "tomar" y este se nos asignara a nosotros y quedara pendiente de confirmacion

#### Mi perfil
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20224136.png?alt=media&token=1319e408-ce26-4803-811d-af9ec5a47ce0)

Esta seccion es diferente a la del resto de usuarios. Cuenta con un boton para ver la segunda imagen de los pacientes.
Tambien contiene un listado de los turnos finalizados con su informacion y un boton para descargar el listado como pdf, el cual cuenta con un filtro opcional para bajar el listado por especialidad.

Ejemplo de pdf:
(https://firebasestorage.googleapis.com/v0/b/tplabo2.appspot.com/o/github%2FCaptura%20de%20pantalla%202023-11-29%20224415.png?alt=media&token=2949ddea-9ab3-4347-b657-dd527b122fef) 



