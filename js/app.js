// Selectores
const inputPaciente = document.querySelector('#paciente');
const inputPropietario = document.querySelector('#propietario');
const inputEmail = document.querySelector('#email');
const inputFecha = document.querySelector('#fecha');
const inputSintomas = document.querySelector('#sintomas');
const formularioCita = document.querySelector('#formulario-cita')

// Objeto cita
const cita = {
    id: crypto.randomUUID(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
};

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

function submitCita(e){
    e.preventDefault();

    if(Object.values(cita).some(valor => valor.trim() === '')){
        mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
}

function mostrarAlerta(msg, tipo){
    // Eliminando alertas duplicadas
    const alertaPrevia = document.querySelector('.alert');
    alertaPrevia?.remove();

    // Creacion alerta
    const alerta = document.createElement('div');
    alerta.textContent = msg;
    alerta.classList.add('p-3', 'text-center', 'w-full', 'text-white', 'my-5', 'alert', 'uppercase', 'text-sm', 'font-bold');

    if(tipo === 'error'){
        alerta.classList.add('bg-red-500');
    }else{
        alerta.classList.add('bg-green-500');
    }

    // Insertando antes del formulario en el DOM
    formularioCita.parentElement.insertBefore(alerta, formularioCita);

    // Eliminando
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}



