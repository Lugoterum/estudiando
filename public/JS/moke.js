/*"use stric";
alert("Bienvenido, pequeño 🐱‍🏍")

  JUAN DAVID CASTRO = Desarrollo de código
  STEFANY AGUILAR   = Flexbox
  DIEGO DE GRANDA   = Optimización del código
  ESTEFFANI SALAS   = Canvas
  DIANA MARTINEZ    = Transferencia de datos
      */

const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionReiniciar = document.getElementById('reiniciar') 

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const botonMascotaJugador = document.getElementById('boton-mascota')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador') 
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVictoriasJugador = document.getElementById('vidas-jugador')
const spanVictoriasEnemigo = document.getElementById('vidas-enemigo')

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const sectionMensajes = document.getElementById('resultado')

// CANVAS   
const sectionVerMapa = document.getElementById('ver-mapa')  // Titulo
const mapa = document.getElementById('mapa')  // canvas

let jugadorId = null
let enemigoId = null
let mascotas = []
let mokeponesEnemigos = []
let opcionDeMokepones
let inputHipo
let inputCapy
let inputRaty
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataqueJugador = []
let ataqueEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './CampoBatalla.jpg'

let lienzo = mapa.getContext("2d") // Permite crear dentro del canvas con dos dimensiones

/* El siguiente grupo de instrucciones es para acomodar el ancho del mapa al ancho de la pantalla  -  Si queremos un ancho fijo, no incluimos este grupo  */

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
// window.innerWidth nos devuelve el ancho de la pantalla  

const anchoMaximoDelMapa = 550
// Aunque la pantalla sea muy ancha, el mapa jamas tendrá mas de 550 px


if (anchoDelMapa > anchoMaximoDelMapa)
{
    anchoDelMapa = anchoMaximoDelMapa - 20
}  

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


/* Hay dos clases de objetos: OBJETOS INSTANCIA que se construyen utilizando una clase (CLASS) 
OBJETOS LITERALES se construyen sin clases, sólo guardan información  */

class Mokepon {
	constructor(nombre, foto, vida, fotoMapa, id = null) {
		this.id = id	
		this.nombre = nombre
		this.foto = foto
		this.vida = vida
		this.ataques = []   /*Los corchetes dicen que es un arreglo (array) y se puede definir despues */
		this.ancho = 60
		this.alto = 60
		this.x = aleatorio(0, mapa.width - this.ancho)
		this.y = aleatorio(0, mapa.height - this.alto)
		this.mapaFoto = new Image()
		this.mapaFoto.src = fotoMapa // Imagen mascotas
		this.velocidadX = 0
		this.velocidadY = 0

  }
/* Los metodos de las clases
Cuando el valor de una propiedad de un objeto es una función se le llama: método.

El método, entonces, es una función que está asociada a un objeto. */
    
    pintarMokepon() {
        lienzo.drawImage(
            // mostrar la mascota en el canvas
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
    /* Los que siguen son los objetos de la clase que acabamos de crear (Mokepon),los nombres se comienzan siempre con Mayúscula. */ 
let hipo = new Mokepon('Hipo', './Hipo.jpg', 3, './Hipocara.png')
let capy = new Mokepon('Capy', './Capy.jpg', 3, './Capycara.png')
let raty = new Mokepon('Raty', './Raty.jfif', 3, './Ratycara.png')

// Ahora adicionamos objetos LITERALES para el arreglo de ataques Mascota
const hipoataques = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌎' , id: 'boton-tierra' },
]  //Los emogis son texto, por eso se escriben entre ' '

hipo.ataques.push(...hipoataques)
/* Los ... son para que la const no se pase como lista sino los valores de los ataques como tal, es como si hubiera escrito todos los ataques dentro del push, se utiliza cuando les vamos a dar esos mismos ataques a otras mascotas sin necesidad de repetirlos uno a uno  */
const capyataques = [
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]
capy.ataques.push(...capyataques)

const ratyataques = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌎', id: 'boton-tierra' },
]
raty.ataques.push(...ratyataques)
 
mascotas.push(hipo, capy, raty) 
/* Con esta instruccion adicionamos objetos LITERALES que componen el arreglo mascotas(pueden ser 3 o 2.000). Para agregarle alguno despues, sólo se adiciona la coma y el nombre */

    // 2 - por aparicion

function iniciarJuego() {   
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    /* La instrucción que sigue significa: Por cada objeto que exista en el arreglo mascotas, haga lo siguiente -- Crea los botones de las mascotas con sus foto y nombre y le da al contenedorTarjetas toda la informacion que se acaba de crear en opcionDeMokepones  */
   
    mascotas.forEach((mokepon) => {       
        opcionDeMokepones = `
         <input type='radio' name='mascota' id='${mokepon.nombre}'/>
        <label class='tarjeta-de-mokepon' for='${mokepon.nombre}'>
            <p>${mokepon.nombre}</p>
            <img src='${mokepon.foto}' alt='${mokepon.nombre}'>
        </label>      
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    
        /* Como ya se crearon los botones de mascotas, ya se pueden ligar a los id y utilizarlos  */
          inputHipo = document.getElementById('Hipo')
          inputCapy = document.getElementById('Capy')
          inputRaty = document.getElementById('Raty') 
    })  
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador) 
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
    
    unirseAlJuego()
}
/* La siguiente función es una peticion para unirse a la sala de juego y obtener un id como jugador, en los fetch si no se especifica el método asume que es un GET 

La dirección 192.168.20.22 es la dirección del wifi en nuestra red familiar y se utiliza ésta para poder unirnos al juego desde otro dispositivo que también la est´s usando, también podríamos usar  localhost:8080 pero solamente podríamos jugar desde el pc */

function unirseAlJuego() {
    fetch('http://192.168.20.22:8080/unirse')
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta    
                    })
            }
        })
}
/* Esta función hace una petición hacia el servidor mediante la función FETCH que permite realizar llamadas hacia otros servicios por medio de http indicando hacia qué URI, luego en qué método (por defecto asume GET). Se recibe una respuesta en texto, asíncrona, es decir que puede tardar unos segundos en llegar, una vez que llegue podemos manejar esos datos por medio de una función callBack que se recibe por un método THEN que tiene fetch

El if es para que si la petición salió bien (ok) traemos los datos de la respuesta en forma de texto  (res.text)   */



    // 3 -  por aparicion

function seleccionarMascotaJugador() {
     /* Para mostrar la mascota en el canvas:
     let imagenDeHipo = new Image()
     imagenDeHipo.src = hipo.foto    
    
     lienzo.drawImage(
        imagenDeHipo,
        20,
        25,
        80,
        100
     )  

     lienzo.fillRect(5, 15, 20, 40)  Dentro de canvas crea un rectangulo (fillRect) en la posición 5(X) 15(Y) 20 (ancho) 40(alto)  
    

     En el siguiente loop :
        - se pregunta que input fue escogido
        - a la variable spanMascotaJugador le damos su id (que en este caso es el nombre)
        - y en la variable mascotaJugador guardamos ese nombre   */

    if (inputHipo.checked) {
        spanMascotaJugador.innerHTML = inputHipo.id
        mascotaJugador = inputHipo.id
    }
    else if (inputCapy.checked) {
        spanMascotaJugador.innerHTML = inputCapy.id
        mascotaJugador = inputCapy.id
    }
    else if (inputRaty.checked) {
        spanMascotaJugador.innerHTML = inputRaty.id
        mascotaJugador = inputRaty.id
    }
    else {
        alert('Debes elegir una mascota')
        return
        /* Cuando entra en este RETURN, se regresa al primer IF  */
    }

    sectionSeleccionarMascota.style.display = 'none'
    /*
    botonMascotaJugador.disable = true

     Con esta instruccion se desabilita el boton de elegir mascota (hasta la proxima eleccion) para que no la pueda cambiar */

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador) // Lleva el nombre de la mascota escogida

    sectionVerMapa.style.display = 'flex' // Muestra canvas
    
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) { // envía el nombre de la mascota elegida al backend
    fetch(`http://192.168.20.22:8080/mokepon/${jugadorId}`, { //Base de URL / nombre del servicio + id jugador ( ${} hace que se sumen)
        method: 'post',
        headers: {
            'Content-type': 'application/json'  // se indica que se envia un JSON
        },
        body: JSON.stringify({ // Convierte el siguiente JSON en cadena de texto
            mokepon: mascotaJugador
        })  // JSON con informacion para el backend
    })
}



function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotaJugador === mascotas[i].nombre) {
            ataques = mascotas[i].ataques
        }
    }
      /* En este loop:
        - haga la variable i = 0, si es menor a la longitud de mascotas, sigue
        - si el nombre que trae en mascotaJugador es = al nombre que me trae la variable i    como índice en mascotas(mascotas[i].nombre)
        - haga la variable ataques = a los ataques de ese nombre
        Si no es igual, aumente uno al valor de i y vuelva a hacer todo el loop    */
    
    mostrarAtaques(ataques)  // Trae los ataques correspondientes a la mascota elegida
}

function mostrarAtaques(ataques) {    
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id= ${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        ` //Hay dos clases: boton-de-ataque  y  BATaque, que se pueden utilizar por separado
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    /* La instrucción anterior significa: Por cada objeto que exista en el arreglo ataques, haga lo siguiente -- Crea los botones de los ataques con su emoticon y le da al contenedorAtaques toda la informacion que se acaba de crear en ataquesMokepon  RECORDEMOS QUE ESTO ES PARA LA MASCOTA ELEGIDA POR EL JUGADOR  */

    /* Como ya se crearon los botones de ataques, ya se pueden ligar los id a las variables que se crearon y utilizarlos con una funcion   */

      botonFuego = document.getElementById('boton-fuego')
      botonAgua = document.getElementById('boton-agua')
      botonTierra = document.getElementById('boton-tierra')
    
    /* En la siguiente instrucción se le está diciendo que seleccione todos los elementos que tengan en comun algo, en este caso, una clase(.BAtaque) y le de ese valor al arreglo botones.  */

      botones = document.querySelectorAll('.BAtaque')
    
    /* Forma manual para dar una función al seleccionar los ataques 
    
      botonFuego.addEventListener('click', ataqueFuego)
      botonAgua.addEventListener('click', ataqueAgua)
      botonTierra.addEventListener('click', ataqueTierra)
    
     */
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
      boton.addEventListener('click', (e) => {
        console.log(e)
      if (e.target.textContent === '🔥') {
        ataqueJugador.push('FUEGO')
        console.log(ataqueJugador) 
        boton.style.background = 'gold'
        boton.disabled = true 
      } else if (e.target.textContent === '💧') {
        ataqueJugador.push('AGUA')
        console.log(ataqueJugador)
        boton.style.background = 'gold'
        boton.disabled = true
      } else {
        ataqueJugador.push('TIERRA')
        console.log(ataqueJugador)
        boton.style.background = 'gold'
        boton.disabled = true
      }
 
      /* Esto significa que en cada elemento del arreglo botones haga lo siguiente: Cuando se haga click en ese elemento, nos devuelva el tipo de evento (e) que se realizó (en este caso es un click) y al saber eso, se tiene mucha información entre la que se puede encontrar, a qué se le está dando ese click, buscamos un método que se llama 'target' y dentro de target vemos todas las propiedades que son parte de ese elemento (dentro de ese método), buscamos dentro de target una propiedad específica llamada 'textContent' que es el valor de contenido final al que hace referencia ese evento.  ---  Todo esto se sabe colocando un console.log(e) y se ve en inspector - consola al escoger un ataque  ---   Esa información que nos trae (e.target.textContent) la comparamos con los ataques que tenemos para saber cual fue el que se usó y eso queda guardado en el arreglo ataqueJugador, que se muestra en la pantalla para llevar la secuencia de los ataques utilizados, enseguida al botón de ese ataque le cambiamos el color para marcarlo como usado y queda deshabilitado  */
      
      if (ataqueJugador.length === 5) {
        enviarAtaques()
      }     
    })
  })
}

function enviarAtaques() { //Vamos a programar el envío de nuestros ataques al servidor
  fetch(`http://192.168.20.22:8080/mokepon/${jugadorId}/ataques`, { // El servicio se llama mokepon, le envío el id del jugador y sus ataques
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ // Estos son los datos que se mandan
      ataques: ataqueJugador
    })
  })
  intervalo = setInterval(obtenerAtaques, 50) // Hace el requerimiento de los ataques cada 50ms
}

function obtenerAtaques() {
  fetch(`http://192.168.20.22:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ ataques }) {
            if (ataques.length === 5) {
              ataqueEnemigo = ataques
              combate()
          }           
        })
      }  
    })
}

function seleccionarMascotaEnemigo(enemigo) {

   /* Seleccionar mascota aleatoria: 
   let mascotaAleatoria = aleatorio(0, mascotas.length - 1)
    Se le está diciendo que asuma la longitud del arreglo mascotas (la cantidad de objetos y le reste 1 porque empieza en 0), para escoger un numero y definir que mascota tiene el enemigo  */
    
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()

    /* Se le está diciendo que la variable spanMascotaEnemigo,que trae informacion de HTML, la haga igual al nombre que corresponde al número de indice(mascotaAleatoria)que resultó de la elección aleatoria -- Cuando a un arreglo se le quiere pedir información de un objeto por su número de índice, ese número se debe colocar entre [] y se adiciona .nombre  .ataques o cualquier cualidad que se quiera. 
    
    A la variable ataquesMokeponEnemigo le damos el valor de la mascota aleatoria que se haya escogido, pero con sus ataques*/
     
}

    /* Esta es la forma manual para hacer la eleccion aleatoria(si son pocos)...

    let mascotaAleatoria = aleatorio(1, 3)

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipo'
    }
    else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Capy'
    }
    else {
        spanMascotaEnemigo.innerHTML = 'Raty'
    } 
      ATAQUES MANUALES 
function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}   */

function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    
    /* Se le está diciendo que al arreglo ataqueAleatorio le de el valor de ataquesMokeponEnemigo, que trae de la función anterior el valor de la mascota aleatoria elegida (en su parte de ataques) y asuma la longitud (la cantidad de objetos y le reste 1 porque empieza en 0) de la variable.  */   

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO') 
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')  
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)

    /* En este loop a ese ataqueAleatorio lo comparamos con el indice del resultado aleatorio  de los ataques que traía y dependiendo del número del índice es el nombre que inyectamos (push) en el arreglo -- PUSH sólo se le puede hacer a un arreglo */    
    
   iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}  
  /*
    Lo único que hace esta función iniciarPelea() es esperar que se hayan seleccionado los 5 ataques de una vez, tanto del jugador como del enemigo, para seguir a dar el resultado en combate(). Se toma únicamente el ataqueJugador porque es el que comienza la secuencia  */

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}   
    /* Esta función, indexAmbosOponentes, lo único que hace es traer el número de ataque en cada selección tanto del jugador como del enemigo (los toma de la función combate), guarda cada uno en una variable, trayendo el ataque que corresponde a la elección, para mostrarlo después       */

function combate() {
    clearInterval(intervalo) // Deja de hacer peticion de ataques
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATADOS 🤷‍♂️')
        }      
        else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
        indexAmbosOponentes(index, index)
        crearMensaje('GANASTE 🐱‍🏍')
        victoriasJugador++
        spanVictoriasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
        indexAmbosOponentes(index, index)
        crearMensaje('GANASTE 🐱‍🏍')
        victoriasJugador++
        spanVictoriasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
        indexAmbosOponentes(index, index)
        crearMensaje('GANASTE 🐱‍🏍')
        victoriasJugador++
        spanVictoriasJugador.innerHTML = victoriasJugador
    }
        else {
        indexAmbosOponentes(index, index)
        crearMensaje('PERDISTE 😢')
        victoriasEnemigo++
        spanVictoriasEnemigo.innerHTML = victoriasEnemigo
    }
  }
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('QUEDARON EMPATADOS 🤷‍♂️')
    }
      else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal(' ¡FELICITACIONES!.. GANASTE 🤗')
    }
      else {
        crearMensajeFinal(' LO SIENTO... PERDISTE 😌')
    }   
}

function crearMensaje(resultado) {
    /*
    let sectionMensajes = document.getElementById('resultado')
    let ataqueDelJugador = document.getElementById('ataque-del-jugador')
    let ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

    Se necesita crear una variable para traer la seccion mensajes y meter el parrafo que trae appendChild */

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    
    /* document.createElement() se utiliza para crear nuevos elementos en HTML desde JS, en este caso se crea un PARRAFO  y con innerHTML se le cambia el contenido */

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}   
/* append.child se utiliza para coger el elemento que se acaba de crear e insertarlo en un elemento de HTML  */
    
function crearMensajeFinal(resultadoFinal) { 
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'

    /* botonFuego.disabled = true
    botonAgua.disabled = true   
    botonTierra.disabled = true
    
    se utiliza para desabilitarlos cuando hubo un ganador */   
}

function reiniciarJuego() {   
    
  document.getElementById('Hipo').checked = false;
  document.getElementById('Capy').checked = false;
  document.getElementById('Raty').checked = false; 
  
  location.reload()
}
/* LOCATION se refiere a la ubicacion (direccion) donde estamos y la propiedad RELOAD lo que hace es recargar la página y recomenzar el juego */

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
/* Con esta funcion (aleatorio), el programa escoge aleatoriamente la mascota y el ataque del enemigo */
   

/* Las siguientes instrucciones son para mover la mascota un punto cada vez:

function pintarPersonaje() {
    lienzo.clearRect(0, 0, mapa.width, mapa.height) // limpia la posicion anterior cada vez que se mueve
    lienzo.drawImage(
        // mostrar la mascota en el canvas
        hipo.mapaFoto,
        hipo.x,
        hipo.y,
        hipo.ancho,
        hipo.alto   
    )
}   

function moverDerecha() {
    hipo.x = hipo.x + 5 // mueve 5 px
    pintarPersonaje()
}

function moverIzquierda() {
    hipo.x = hipo.x - 5 
    pintarPersonaje()
}

function moverAbajo() {
    hipo.y = hipo.y + 5 
    pintarPersonaje()
}

function moverArriba() {
    hipo.y = hipo.y - 5 
    pintarPersonaje()
}
*/

function pintarAmbiente() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
  
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
  
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        // Mostrar el mapa en el canvas
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    /* En mascotaJugadorObjeto está la mascota escogida y ahora la traemos (pintamos) con la función pintarMokepon()  */
    
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)


    //Enseguida pintamos la mascota enemiga:
    
  mokeponesEnemigos.forEach(function (mokepon) {
      mokepon.pintarMokepon()
      revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
  	fetch(`http://192.168.20.22:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ // Convierte un objeto o valor en una cadena de texto json para enviarlo
            x, 
            y
        })
            /* Los archivos json se componen de { dentro se da nombre de la clave : valor} ej:  x: x   pero cuando la llave y el valor son iguales, con sólo colocar la llave es suficiente. En este caso lo que se ve en el servidor es una variable x que tiene como valor la coordenada que haya tenido en ese momento la mascota */
    })
        
        // Se recibe la respuesta     
            
		.then(function (res) {// antes de ser procesada
			if (res.ok) { // verifica que venga todo bien
				res.json() // Para leer tipo json
          .then(function ({ enemigos }) { // De la respuesta se extrae la info. que queramos en este caso enemigos, la misma que enviamos del navegador
            console.log(enemigos) // Nos devuelve una lista de enemigos actuales 
              
						mokeponesEnemigos = enemigos.map(function (enemigo) {  // MAP, como el forEach, recorre esa lista buscando id distintos al nuestro, pero a diferencia de éste, nos retorna una lista
              let mokeponEnemigo = null
              // Por cada id distinto, crea un enemigo con mascota
              const mokeponNombre = enemigo.mokepon.nombre || ""  // Se le dice que nos traiga el nombre de la mascota de ese enemigo y si hay error, que lo traiga vacío. Todo viene del servidor

              // De acuerdo a la mascota que traiga es el enemigo que se crea ...
							if (mokeponNombre === 'Hipo') {
                mokeponEnemigo = new Mokepon('Hipo', './Hipo.jpg', 3, './Hipocara.png', enemigo.id)
							} else if (mokeponNombre === 'Capy') {
                mokeponEnemigo = new Mokepon('Capy', './Capy.jpg', 3, './Capycara.png', enemigo.id)
							} else if (mokeponNombre === 'Raty') {
								mokeponEnemigo = new Mokepon('Raty', './Raty.jfif', 3, './Ratycara.png', enemigo.id) 
              } 
              
              mokeponEnemigo.x = enemigo.x 
              mokeponEnemigo.y = enemigo.y
              // Son las coordenadas que los otros jugadores enviaron al servidor, en el momento que se unieron al juego


              // Ya sabiendo qué enemigo se crea y dónde está, lo pintamos en el mapa
              return mokeponEnemigo
              // Lo que regresa MAP
						})					
					})
			}    
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5 // se mueve continuamente,cada de a 5 px
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

// Moverlo también con las teclas
function teclaPresionada(event) {  // nos trae qué tecla se presionó
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

/* SWITCH es igual a hacer varios if seguidos, se da lo que se va a comparar (event.key - informacion que viene del  window.addEventListener(keydown, teclaPresionada) nos trae qué tecla se presionó y la compara con cada caso, si es igual, el break termina la comparación, si no, sigue comparando, al final, si no se ha igualado ningun caso, viene el default, que en este ejemplo, no hace nada.  */

function iniciarMapa() {

    /* Se utilizan cuando tenemos un tamaño fijo de pantalla 
    mapa.width = 1000   //Tamaño del canvas
    mapa.height = 400   */

  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
  
  console.log(mascotaJugadorObjeto, mascotaJugador);
  
  intervalo = setInterval(pintarAmbiente, 50)

    /* va limpiando las posiciones anteriores
    Llama una función (pintarAmbiente) cada cierto tiempo (50 milisegundos)  */
 
  window.addEventListener('keydown', teclaPresionada)
  
  window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotaJugador === mascotas[i].nombre) {
            return mascotas[i]
        }
    }
}
/* En este ciclo (for):
      Se recorre el arreglo mascotas buscando la que coincida con la seleccionada (en mascotaJugador) y regresamos ese objeto completo  en mascotas[i]
        */

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x

  const arribaMascota = mascotaJugadorObjeto.y
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
  const izquierdaMascota = mascotaJugadorObjeto.x

  if (
    /* Si se cumple alguna de estas opciones, el programa sigue, sino, HAY COLISIÓN, la mascota se para, desaparece el mapa (ambiente) y aparece la opción para escoger el ataque */

    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo 
  ) {
      return
    }
    
    if (enemigo.x == undefined || enemigo.y == undefined) {
        return
    }
    
    detenerMovimiento()
    clearInterval(intervalo)
  
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    // alert('Hay colisión con ' + enemigo.nombre)
}


window.addEventListener('load', iniciarJuego)


/* Cuando el navegador termina de leer el codigo HTML, por esta instruccion, se dispara " iniciar juego" */
    
