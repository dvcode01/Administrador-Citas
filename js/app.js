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

    
}



