const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector ('#vaciar-carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
let productos = [];

function cargarCarrito () {
    listaCursos.addEventListener('click', agregarCurso);

    vaciarCarritoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        productos = [];
        
    });

    carrito.addEventListener('click', eliminarCurso);

}
cargarCarrito()

function agregarCurso (e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')){
     const cursoSeleccionado = e.target.parentElement.parentElement;
     leerDatosCurso(cursoSeleccionado)
    }
    
}

function leerDatosCurso(curso) {
    
   const infoCurso = {
    imagen : curso.querySelector('img').src,
    titulo : curso.querySelector('h4').textContent,
    precio : curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad : 1 
   }

   if(productos.some(p => p.id === infoCurso.id)){
    const cursos = productos.map((producto) => {
        if(producto.id === infoCurso.id){
            producto.cantidad++;
            return producto;
        } else{
            return producto;
        }
    })
    productos= [...cursos]
   

}else{
    productos = [...productos, infoCurso]
}
  
  
   cargarHTML();
}

function cargarHTML () {
    listaCarrito.innerHTML= '';

    productos.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = ` 
        <td> 
            <img src="${p.imagen}" width="100" />
        </td>
        <td>${p.titulo}</td>
        <td>${p.precio}</td>
        <td>${p.cantidad}</td>
        <td>
           <a href="#" class="borrar-curso" data-id="${p.id}">X</a>
        </td>

`
        listaCarrito.appendChild(row);
    })
}

function eliminarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id');
        productos = productos.filter(p => p.id !== id);
    }
    cargarHTML()
}