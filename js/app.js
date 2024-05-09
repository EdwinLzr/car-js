// variables
const carrito=document.querySelector('#carrito')
const listaCursos=document.querySelector('#lista-cursos')
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito')
const contenedorCarrito=document.querySelector('#lista-carrito tbody')
let articulosCarrito=[]


cargarEventListener()
function cargarEventListener(){
listaCursos.addEventListener('click', agregarCurso)

// elimina cursos del carrito
carrito.addEventListener('click', eliminarCurso)

vaciarCarritoBtn.addEventListener('click',()=>{
    articulosCarrito=[];//vaciamos
   limpiarHTML()//limpiamos el html
} )

}

// FUNCIONES
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
       const cursoSelecionado=e.target.parentElement.parentElement  
       leerDatosCurso(cursoSelecionado)
    }
  


}
// eliminacurso
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
     const cursoId = e.target.getAttribute('data-id')
    //  eliminar articulo por el dataid
    articulosCarrito=articulosCarrito.filter((curso)=>curso.id !== cursoId)
   carritoHTML()//volvemos a iterar sobre el carrito y mostramos el html
    }
}

// leer el contenido del html
function leerDatosCurso(curso){

//   crear objeto
const infoCurso={
    img:curso.querySelector('img').src,
    titulo:curso.querySelector('h4').textContent,
    precio:curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad:1

}
// revisa si ya existe
const existe=articulosCarrito.some((curso)=>curso.id===infoCurso.id);
if(existe){
// actualizamos cantidad
const cursos =articulosCarrito.map((curso)=>{
    if(curso.id===infoCurso.id){
      curso.cantidad++;
      return curso;//retorna actualizado
    }else{
        return curso//retorna los no duplicados
    }
})
    articulosCarrito=[...cursos]
}else{
   // agragar al carrito
articulosCarrito=[...articulosCarrito, infoCurso] 
}



carritoHTML()
}



// muestra en carrtio en el html
function carritoHTML(){

    // limpiar el html PARA EVITAR DUPLICADOS
   limpiarHTML()

    articulosCarrito.forEach((curso)=>{
        const {img,titulo, precio, cantidad, id}=curso
        const row=document.createElement('tr')
        row.innerHTML=`
        <td>
        <img src='${img}' width='100'>
        </td>
        <td>
        ${titulo}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
        <a href='#' class='borrar-curso' data-id='${id}'>X</a>
        </td>

        `;

        // agraga el html al tbody
        contenedorCarrito.appendChild(row)

    })
}

// elimina los cursos del tbody
function limpiarHTML(){
    // FORMA LENTA
    // contenedorCarrito.innerHTML=''

    // forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}