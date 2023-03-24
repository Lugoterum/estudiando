/* console.log('Comienzo con NodeJS')

 JSON  JavaScrip Object Notation
Es un tipo de datos objeto que no se define con la clase (class) sino que directamente definimos su extructura y a través de ella, con datos reales, también de una vez definimos cual es el objeto. También es una forma de comunicar el FrontEnd y el BackEnd, este paquete de datos lleva información desde el cliente al servidor y viceversa 
*/

const express = require('express')

/* Se crea una constante cuyo valor es la librería EXPRESS que instalé con npm.  
REQUIRE es una función especial de NodeJS que permite importar esas librerías para utilizarlas.
Con la librería express puedo crear una app que represente al servidor,  que constantemente reciba y responda las peticiones de los clientes por medio de un puerto */

const app = express()  // como una función
// Esta const almacena la aplicacion express

const cors = require('cors')

/* Se crea una constante cuyo valor es la librería CORS que instalé con npm.  
Esta libreria  soluciona el problema de los origenes que pueden enviar solicitudes a nuestro servidor y con REQUIRE la importo para utilizarla   */

app.use(express.static('public'))

/* Para podernos comunicar y jugar desde cualquier dispositivo que esté en la misma red wifi -  Nos ayuda a entrar al HTML desde el servidor de NODE.JS y conectarlo a la red local, se crea una carpeta (generalmente se utiliza public) y se incluyen en ella todos los archivos estáticos como JS, CSS, HTML y todas las imágenes que utilice el juego

Desde el BACKEND estamos haciendo que funcione el FRONTEND con esta conexion 
Ahora podemos (con el servidor funcionando) dar en la línea del navegador...
localhost:8080   para entrar al juego directamente

8080 es el puerto que tenemos designado en este archivo (index.js) para tener comunicación  

Podemos saber el nombre del computador dando en el servidor... hostname  En este pc dió DESKTOP-QIP23G2
Y para saber la ip del wifi damos...
 ipconfig y tomamos el número de la conexión wife que dice   direccion IPv4  en esta red dió 
 192.168.20.22

 Si queremos entrar al juego desde un dispositivo distinto al pc, éste dispositivo debe estar conectado a la misma red de wifi y colocar en el navegador ...
 192.168.20.22:8080   y listo
    */

app.use(cors())

/* Le digo a la const app (que es la libreria express) que utilice la libreria CORS   */

app.use(express.json())

/* Se activan las peticiones que soportan el formato json(como peticiones tipo POST)  */

const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon) { // esto es un método para que cada jugador tenga su mascota
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {  // Otro método para que el jugador tenga sus propias coordenadas
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

// Crear un endPoint (peticion)
app.get('/unirse', (req, res) => {  
    const id = `${Math.random()}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    /* Esta es una peticion tipo GET que solicita informacion. Cada vez que se agrega un jugador hacemos que la página en el frontEnd llame a un servicio en el backEnd para que se registre ese nuevo jugador y le devuelva el id que se crea al random como una cadena de texto para trabajarlo así todo el tiempo 
    Luego se crea ese nuevo jugador con su id y después se agrega a la lista de jugadores (push) */

   res.setHeader('Access-Control-Allow-Origin', '*')
    /* Esta cabecera da permiso para que se hagan peticiones a nuestro servidor desde cualquier origen (*)      */

    res.send(id)

    /* En respuesta envía el id

    res.send('Aquí voy') Para string se colocan comillas   */
})

app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || '' // Se extrae de la peticion hecha, si no viene, muestra una cadena vacía
    const nombre = req.body.mokepon || '' // igual al anterior y trae el nombre del mokepon
    const mokepon = new Mokepon(nombre)  // Esta variable queda con la mascota del usuario

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)  /* Esto dice: dentro de la lista de jugadores busque un jugador cuyo id sea igual al que envió la solicitud y déle ese valor a la constante jugadorIndex. FINDINDEX es una funcion para buscar en toda la lista un elemento que cumpla una condicion (en este caso,que sea igual al que envió el requerimiento), si existe nos devuelve el numero de lista, si no, nos devuelve -1, de esta manera podemos validar, si el elemento existe nos va a devolver un numero mayor de 0 que es el numero de lista con el cual podemos acceder ese elemento  */

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon) /* Si el valor que nos retorna es mayor o igual a cero, es porque existe y a ese jugadorIndex le asignamos la mascota que eligió mediante la funcion asignarMokepon, en caso que no, se continua con el ciclo */
    }
    console.log(jugadores)// lista de jugadores agregados
    console.log(jugadorId)// id del jugador que realizó la peticion

    res.end() // Termina la peticion 
})

/* Esta petición tipo post admite datos en json, ponemos (mokepon) como nombre del servicio diferente al anterior para que cada una se resuelva por aparte, luego una variable tipo parametro que en este caso es el id del jugador que está seleccionando(con : es la forma de definir una variable en express en la URL), enseguida la callback, que procesa la solicitud (req, res - peticion, respuesta)  */

app.post('/mokepon/:jugadorId/posicion', (req, res) => {  // Se envía el nombre del servicio (mokepon), el identificador del jugador y la posicion de la mascota
    const jugadorId = req.params.jugadorId || ''
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
    /* Las siguientes instrucciones son para que coja la lista de jugadores que hay en ese momento y la filtre comparando a cada jugador con el jugador que tenga el mismo id del que acaba de enviar la peticion, de esta forma se devuelve como respuesta el nombre de los enemigos  mediante un json(enemigos) que contiene la lista  */
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({ // res.end() Si no se va a responder, se coloca un dato vacío
        enemigos
    })
    
})

app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const ataques = req.body.ataques || [] // Si no funciona trae una cadena vacía
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)  

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques) /* Si el valor que nos retorna es mayor o igual a cero, es porque existe y a ese jugadorIndex le asignamos los ataques que eligió, en caso que no exista, se continua con el ciclo */
    }
        res.end() // Termina la peticion 
})

// Solicitar los ataque del jugador
app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)  // Se busca el id del jugador(y se conoce la mascota elegida)
    res.send({ // Con el id se conocen los ataque y se envían
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.log('Servidor funcionando')
})
/* Inicia el servidor, crea un call back
  
  Para prender el servidor se da node index.js (en la terminal)
  Para apagar el servidor se da ctrl + c (en la terminal) */

/* Para ver en el navegador lo que estamos haciendo:
- Se prende el servidor 
- Se da en el navegador localhost:8080 (el puerto que se le indicó en app.listen)   */


