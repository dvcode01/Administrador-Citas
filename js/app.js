// Selectores
const inputPaciente = document.querySelector('#paciente');
const inputPropietario = document.querySelector('#propietario');
const inputEmail = document.querySelector('#email');
const inputFecha = document.querySelector('#fecha');
const inputSintomas = document.querySelector('#sintomas');

// Objeto cita
const cita = {
    id: crypto.randomUUID(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: []
};



