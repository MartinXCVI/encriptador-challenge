const usuarioTexto = document.getElementById('usuario-texto')
const encriptarBtn = document.querySelector('.encriptar-btn')
const desencriptarBtn = document.querySelector('.desencriptar-btn')
const lateral = document.querySelector('.lateral')
const mensajeFinal = document.querySelector('.mensaje-final')
const imagenLateral = document.querySelector('.lateral-fig')
const divLateral = document.querySelector('.lateral-div')
const copiarBtn = document.querySelector('.copiar-btn')
const notificacion = document.querySelector('.notificacion')

const iconoExito = `<i class="fa-regular fa-circle-check icono-noti"></i>`
const iconoFallo = `<i class="fa-regular fa-circle-xmark icono-fallo"></i>`
const iconoCopia = `<i class="fa-solid fa-copy icono-copia"></i>`

let remplazo = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"]
]

// Filtrado de caracteres inválidos
function validar(texto){
  // RegEx para filtrar símbolos
  const patron = /^[a-zA-Z]/ 
  const noValidas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Á",
    "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú", "À", "È", "Ì", "Ò", "Ù", "à",
    "è", "ì", "ò", "ù"]
  let contador = 0;

  for(let i = 0; i < texto.length; i++){
    for(let j = 0; j < noValidas.length; j++) {
      if(texto.charAt(i) == noValidas[j]){
        contador++;
      }
    }
  }
  return contador == 0 && patron.test(texto) == true ? true : false
}

// Muestra del texto encriptado/desencriptado
function limpiarLateral(mensaje) {
  mensajeFinal.classList.remove('ocultar')
  mensajeFinal.innerHTML = mensaje
  imagenLateral.classList.add('ocultar')
  divLateral.classList.add('ocultar')
  copiarBtn.classList.remove('ocultar')
  lateral.style.justifyContent = 'space-between'
}

// Mostrar panel lateral
function mostrarLateral() {
  mensajeFinal.classList.add('ocultar')
  imagenLateral.classList.remove('ocultar')
  divLateral.classList.remove('ocultar')
  copiarBtn.classList.add('ocultar')
  lateral.style.justifyContent = 'center'
}

// Mensajes de notificacion al usuario
function mensajeOperacion(mensaje, icono) {
  notificacion.innerHTML = `${mensaje} ${icono}`
  notificacion.style.color = 'springgreen'
  setTimeout(()=> {
    notificacion.innerHTML = ''
  }, 5000)
}

// Color del mensaje notificativo
function notificacionColor(color) {
  notificacion.style.color = color
}

//----- ENCRIPTACIÓN
encriptarBtn.addEventListener('click', ()=> {
  const texto = usuarioTexto.value

  if(!validar(texto)) {
    mensajeOperacion('Texto inválido. Ni mayúsculas, ni símbolos.', iconoFallo)
    notificacionColor('red')
    mostrarLateral()
  } else if(texto != '') {
      function encriptarTexto(textoNuevo) {
        for( let i = 0; i < remplazo.length; i++) {
          if(textoNuevo.includes(remplazo[i][0])) {
            textoNuevo = textoNuevo.replaceAll(remplazo[i][0], remplazo[i][1])
          }
        }
        return textoNuevo
      }
      const textoEncriptado = encriptarTexto(texto)
      limpiarLateral(textoEncriptado)
      usuarioTexto.value = ''
      mensajeOperacion('Texto encriptado exitosamente', iconoExito)
      copiarBtn.focus()
  } else {
    mostrarLateral()
    mensajeOperacion('', '')
  }
})

//----- DESENCRIPTACIÓN
desencriptarBtn.addEventListener('click', ()=> {
  const texto = usuarioTexto.value

  if(!validar(texto)) {
    mensajeOperacion('Texto inválido. Ni mayúsculas ni símbolos.', iconoFallo)
    notificacionColor('red')
    mostrarLateral()
  } else if(texto != '') {
      function desencriptarTexto(textoNuevo) {
        for(let i = 0; i < remplazo.length; i++) {
          if(textoNuevo.includes(remplazo[i][1])) {
            textoNuevo = textoNuevo.replaceAll(remplazo[i][1], remplazo[i][0])
          }
        }
        return textoNuevo
      }
      const textoDesencriptado = desencriptarTexto(texto)
      limpiarLateral(textoDesencriptado)
      usuarioTexto.value = ''
      mensajeOperacion('Texto desencriptado exitosamente', iconoExito)
      copiarBtn.focus()
  } else {
    mostrarLateral()
    mensajeOperacion('', '')
  }
})

// Boton de copiar la encriptación/desencriptación
copiarBtn.addEventListener('click', ()=> {
  let texto = mensajeFinal
  navigator.clipboard.writeText(texto.value)
  mensajeFinal.innerHTML = ''
  mostrarLateral()
  usuarioTexto.focus()
  mensajeOperacion('Texto copiado y listo', iconoCopia)
  notificacionColor('#0a3871')
})
