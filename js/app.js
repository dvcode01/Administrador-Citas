// Selectores
const inputPaciente = document.querySelector('#paciente');
const inputPropietario = document.querySelector('#propietario');
const inputEmail = document.querySelector('#email');
const inputFecha = document.querySelector('#fecha');
const inputSintomas = document.querySelector('#sintomas');
const formularioCita = document.querySelector('#formulario-cita');
const citasContainer = document.querySelector('#citas');

// Objeto cita
const cita = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
};

// Clases
class Notificacion{
    constructor({texto, tipo}){
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    }

    mostrar(){
        // Eliminando alertas duplicadas
        const alertaPrevia = document.querySelector('.alert');
        alertaPrevia?.remove();

        // Creacion alerta
        const alerta = document.createElement('div');
        alerta.textContent = this.texto;
        alerta.classList.add('p-3', 'text-center', 'w-full', 'text-white', 'my-5', 'alert', 'uppercase', 'text-sm', 'font-bold');

        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        // Insertando antes del formulario en el DOM
        formularioCita.parentElement.insertBefore(alerta, formularioCita);

        // Eliminando
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

class AdminCitas{
    constructor(){
        this.citas = [];
    }

    agregar(cita){
        this.citas = [...this.citas, cita];
    }

    mostrarCitas(){
        // Limpiar HTML
        this.limpiarCitas();

        // Generando citas
        this.citas.forEach(cita => {
            const {paciente, propietario, email, fecha, sintomas} = cita;

            const citaDiv = document.createElement('div');
            citaDiv.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl');

            const citaPaciente = document.createElement('p');
            citaPaciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            citaPaciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${paciente}`;

            const citaPropietario = document.createElement('p');
            citaPropietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            citaPropietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${propietario}`;

            const citaEmail = document.createElement('p');
            citaEmail.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            citaEmail.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${email}`;

            const citaFecha = document.createElement('p');
            citaFecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            citaFecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${fecha}`;

            const citaSintomas = document.createElement('p');
            citaSintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            citaSintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${sintomas}`;

            // Agregando la informacion a la cita
            citaDiv.appendChild(citaPaciente);
            citaDiv.appendChild(citaPropietario);
            citaDiv.appendChild(citaEmail);
            citaDiv.appendChild(citaFecha);
            citaDiv.appendChild(citaSintomas);

            // Agregando al contenedor de las citas
            citasContainer.appendChild(citaDiv);
        });
    }

    limpiarCitas(){
        while(citasContainer.firstChild){
            citasContainer.removeChild(citasContainer.firstChild);
        }
    }
}

// Eventos
listeners();

function listeners(){
    inputPaciente.addEventListener('change', datosCita);
    inputPropietario.addEventListener('change', datosCita);
    inputEmail.addEventListener('change', datosCita);
    inputFecha.addEventListener('change', datosCita);
    inputSintomas.addEventListener('change', datosCita);
    formularioCita.addEventListener('submit', submitCita);
}

function datosCita(e){
    cita[e.target.name] = e.target.value;
}

const citas = new AdminCitas();

function submitCita(e){
    e.preventDefault();

    // Comprobando si los campos estan vacios
    if(Object.values(cita).some(valor => valor.trim() === '')){
        new Notificacion({texto: 'Todos los campos son obligatorios', tipo: 'error'});
        return;
    }

    // Guardando cita
    citas.agregar({...cita});
    new Notificacion({texto: 'Paciente guardado', tipo: 'success'});


    // Mostrando citas
    citas.mostrarCitas();

    // Reseteando formulario y objeto cita
    formularioCita.reset();
    resetearCitaObj();
}

function mostrarCitas(){
    // Limpiar HTML
    limpiarCitas();

    // Generando citas
    citas.forEach(cita => {
        const {id, paciente, propietario, email, fecha, sintomas} = cita;

        const citaDiv = document.createElement('div');
        citaDiv.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl');

        const citaPaciente = document.createElement('p');
        citaPaciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
        citaPaciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${paciente}`;

        const citaPropietario = document.createElement('p');
        citaPropietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
        citaPropietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${propietario}`;

        const citaEmail = document.createElement('p');
        citaEmail.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
        citaEmail.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${email}`;

        const citaFecha = document.createElement('p');
        citaFecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
        citaFecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${fecha}`;

        const citaSintomas = document.createElement('p');
        citaSintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
        citaSintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${sintomas}`;

        // Agregando la informacion a la cita
        citaDiv.appendChild(citaPaciente);
        citaDiv.appendChild(citaPropietario);
        citaDiv.appendChild(citaEmail);
        citaDiv.appendChild(citaFecha);
        citaDiv.appendChild(citaSintomas);

        // Agregando al contenedor de las citas
        citasContainer.appendChild(citaDiv);
    });
}

function resetearCitaObj(){
    // Reiniciar objeto
    cita.paciente =  '';
    cita.propietario =  '';
    cita.email =  '';
    cita.fecha =  '';
    cita.sintomas = '';
}




