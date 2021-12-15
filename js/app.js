/* ======================= VARIABLES Y SELECTORES ====================== */


// Inputs

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


// UI

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;


/* =============================== CLASES ============================== */


class Citas {

    constructor() {

        this.citas = [];

    }

    agregarCita(cita) {

        this.citas = [...this.citas, cita];

    }

    eliminarCita(id) {

        this.citas = this.citas.filter(cita => cita.id !== id);

    }

    editarCita(citaActualizada) {

        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);

    }

}

class UI {

    imprimirAlerta(mensaje, tipo) {

        //Crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar alerta
        setTimeout(() => {

            divMensaje.remove();

        }, 2000);

    }

    imprimirCitas( {citas} ) {

        this.limpiarHTML();

        citas.forEach(cita => {

            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;
            
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            // Botón Eliminar Cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

            btnEliminar.onclick = () => eliminarCita(id);

            // Botón Editar Cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>';

            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar los párrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agregar las citas al HTMl
            contenedorCitas.appendChild(divCita);
            
        });

    }

    limpiarHTML() {

        while (contenedorCitas.firstChild) {

            contenedorCitas.removeChild(contenedorCitas.firstChild);

        }

    }

}

const ui = new UI();
const administrarCitas = new Citas();






/* ========================== EVENT LISTENER =========================== */


eventListeners();

function eventListeners() {

    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
    
}


// Objeto con informaión de las citas

const citaObj = {

    mascota     : '',
    propietario : '',
    telefono    : '',
    fecha       : '',
    hora        : '',
    sintomas    : ''

}

/* ============================= FUNCIONES ============================= */


// Agregar datos al objeto de las citas

function datosCita(e) {

    citaObj[e.target.name] = e.target.value;

    console.log(citaObj);

}


// Valida y agrega una nueva cita

function nuevaCita(e) {
    
    e.preventDefault();

    // Extraer la información del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;

    }

    if (editando) {

        ui.imprimirAlerta('Se editó correctamente');

        // Pasar el objeto de la cita a edición
        administrarCitas.editarCita( {...citaObj} );

        // Regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar modo edición
        editando = false;

    } else {

        // Generar un ID único
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita( {...citaObj} );

        // Mensaje de agregado correcto
        ui.imprimirAlerta('Se agregó correctamente');

    }

    

    // Reiniciar el objeto para la validación
    reiniciarObjeto();

    // Reiniciar el formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto() {

    citaObj.mascota     = '';
    citaObj.propietario = '';
    citaObj.telefono    = '';
    citaObj.fecha       = '';
    citaObj.hora        = '';
    citaObj.sintomas    = '';

}

function eliminarCita(id) {

    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Mostrar mensaje
    ui.imprimirAlerta('Se eliminó la cita');

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);

}

// Carga los datos y el modo edición
function cargarEdicion(cita) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambia texto de botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
    
}