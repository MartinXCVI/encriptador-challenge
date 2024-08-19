const usuarioTexto = document.getElementById('usuario-texto')
const encriptarBtn = document.querySelector('.encriptar-btn')
const desencriptarBtn = document.querySelector('.desencriptar-btn')
const lateral = document.querySelector('.lateral')
const mensajeFinal = document.querySelector('.mensaje-final')
const imagenLateral = document.querySelector('.lateral-fig')
const divLateral = document.querySelector('.lateral-div')
const copiarBtn = document.querySelector('.copiar-btn')

let remplazo = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"]
]

function limpiarLateral(mensaje) {
  mensajeFinal.classList.toggle('ocultar')
  mensajeFinal.innerHTML = mensaje
  imagenLateral.classList.toggle('ocultar')
  divLateral.classList.toggle('ocultar')
  copiarBtn.classList.toggle('ocultar')
  lateral.style.justifyContent = 'space-between'
}

function mostrarLateral() {
  mensajeFinal.classList.toggle('ocultar')
  mensajeFinal.innerHTML = ''
  imagenLateral.classList.toggle('ocultar')
  divLateral.classList.toggle('ocultar')
  copiarBtn.classList.toggle('ocultar')
  lateral.style.justifyContent = 'center'
}

encriptarBtn.addEventListener('click', ()=> {
  const texto = usuarioTexto.value.toLowerCase()

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
})

desencriptarBtn.addEventListener('click', ()=> {
  const texto = usuarioTexto.value.toLowerCase()
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
})

copiarBtn.addEventListener('click', ()=> {
  let texto = mensajeFinal
  navigator.clipboard.writeText(texto.value)
  mensajeFinal.innerHTML = ''
  mostrarLateral()
  usuarioTexto.focus()
})