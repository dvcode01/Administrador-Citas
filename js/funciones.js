import { cita, editando  } from './variables.js';
import Notificacion from './classes/Notificacion.js';
import AdminCitas from './classes/AdminCitas.js';
import { formularioCita, formularioInput, inputEmail, inputFecha, inputPaciente, inputPropietario, inputSintomas} from './selectores.js';

const citas = new AdminCitas();

// Funciones
export function datosCita(e){
    cita[e.target.name] = e.target.value;
}

export function submitCita(e){
    e.preventDefault();

    // Comprobando si los campos estan vacios
    if(Object.values(cita).some(valor => valor.trim() === '')){
        new Notificacion({texto: 'Todos los campos son obligatorios', tipo: 'error'});
        return;
    }

    // Comprueba si se debe registrar o editar un registro
    if(editando.value){
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
    editando.value = false;
    formularioInput.value = 'Registrar Paciente';
}

export function resetearCitaObj(){
    // Reiniciar objeto
    cita.id = crypto.randomUUID()
    cita.paciente =  '';
    cita.propietario =  '';
    cita.email =  '';
    cita.fecha =  '';
    cita.sintomas = '';
}

export function cargarEdicion(citaObj){
    Object.assign(cita, citaObj);

    inputPaciente.value = citaObj.paciente;
    inputPropietario.value = citaObj.propietario;
    inputEmail.value = citaObj.email;
    inputFecha.value = citaObj.fecha;
    inputSintomas.value = citaObj.sintomas;

    editando.value = true;

    // Modificando texto del submit
    formularioInput.value = 'Guardar Cambios';
}