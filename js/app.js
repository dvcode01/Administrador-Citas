
import Notificacion from "./classes/Notificacion.js";
import AdminCitas from "./classes/AdminCitas.js";
import { formularioCita, formularioInput, inputEmail, inputFecha, inputPaciente, inputPropietario, inputSintomas } from './selectores.js';


let editando = false;

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

const citas = new AdminCitas();

function submitCita(e){
    e.preventDefault();

    // Comprobando si los campos estan vacios
    if(Object.values(cita).some(valor => valor.trim() === '')){
        new Notificacion({texto: 'Todos los campos son obligatorios', tipo: 'error'});
        return;
    }

    // Comprueba si se debe registrar o editar un registro
    if(editando){
        citas.actualizar({...cita});
        new Notificacion({texto: 'Guardado correctamente', tipo: 'success'});
    }else{
        citas.agregar({...cita});
        new Notificacion({texto: 'Paciente registrado', tipo: 'success'});
    }


    // Mostrando citas
    citas.mostrarCitas();

    // Reseteando formulario y objeto cita
    formularioCita.reset();
    resetearCitaObj();
    editando = false;
    formularioInput.value = 'Registrar Paciente';
}

function resetearCitaObj(){
    // Reiniciar objeto
    cita.id = crypto.randomUUID()
    cita.paciente =  '';
    cita.propietario =  '';
    cita.email =  '';
    cita.fecha =  '';
    cita.sintomas = '';
}

function cargarEdicion(citaObj){
    Object.assign(cita, citaObj);

    inputPaciente.value = citaObj.paciente;
    inputPropietario.value = citaObj.propietario;
    inputEmail.value = citaObj.email;
    inputFecha.value = citaObj.fecha;
    inputSintomas.value = citaObj.sintomas;

    editando = true;

    // Modificando texto del submit
    formularioInput.value = 'Guardar Cambios';
}




