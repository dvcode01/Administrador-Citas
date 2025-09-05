import { formularioCita, inputEmail, inputFecha, inputPaciente, inputPropietario, inputSintomas } from './selectores.js';

import { datosCita, submitCita } from './funciones.js';

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







