let pagina = 1;
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();

    //Resalta el Div actual segun el tab al que se presiona
    mostrarSeccion();

    //oculta o muestra una sección segun el tab que se presiona
    cambiarSeccion();  

    //Paginacion siguiente y anterior
    paginaSiguiente();

    paginaAnterior();

    //Comprueba la pagina actual para ocultar o mostrar la paginacion
    botonesPaginador();    

} 

function mostrarSeccion() {

     // Eliminar mostrar-seccion de la seccion anterior

     const seccionAnterior = document.querySelector('.mostrar-seccion');
     if( seccionAnterior) {
         seccionAnterior.classList.remove( 'mostrar-seccion');
     }

     const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    //eliminar la clase de actual en el tab anterior
     const tabAnterior = document.querySelector('.tabs .actual');
     if(tabAnterior){
         tabAnterior.classList.remove('actual');
     }
    

    // resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');

}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

        

             // Llamar la funcion de mostrar seccion
             mostrarSeccion();

             botonesPaginador();
        }) 
    })
} 


async function mostrarServicios() {
    try {
        const resultado = await fetch('./servicios.json');
        const db =  await resultado.json();

        const {servicios} = db;

        // generamos el html 
        servicios.forEach( servicio => {
            const { id, nombre, precio } = servicio;

            // DOM Scripting
            // generar nombre de servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-Servicio');
    

            //generar precio del servicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-Servicio');

            // generar div contenedor de servicio
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.dataset.idServicio = id;

            //selecciona un servicio para la cita
            servicioDiv.onclick = seleccionarServicio;

            // inyectar precio y nombre al div del servicio
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            // Inyectarlo en el HTML
            document.querySelector('#servicios').appendChild(servicioDiv);

        });

    } catch (error) {
        console.log(error);
    }
}  

function seleccionarServicio(e) {
    let elemento;
    // Forzar que el elemento al cual le damos click sea el DIV
    if(e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    
    } else {
        elemento = e.target;
    }

    if(elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
    } else {
        elemento.classList.add('seleccionado');
    }

}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {
        pagina++;

        console.log(pagina);

        botonesPaginador();
    });
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {
        pagina--;

        console.log(pagina);
  
        botonesPaginador();

    });
} 

function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(pagina === 1) {
        paginaAnterior.classList.add('ocultar');
    } else if (pagina ===3 ){
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    } else {
         paginaAnterior.classList.remove('ocultar');
         paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();  // cambia la seccion que se muestra por la de la pagina
}