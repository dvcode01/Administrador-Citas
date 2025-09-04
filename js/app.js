// Selectores
const inputPaciente = document.querySelector('#paciente');
const inputPropietario = document.querySelector('#propietario');
const inputEmail = document.querySelector('#email');
const inputFecha = document.querySelector('#fecha');
const inputSintomas = document.querySelector('#sintomas');
const formularioCita = document.querySelector('#formulario-cita');
const citasContainer = document.querySelector('#citas');

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
        console.log(citas);
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

            // Botones
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => {
                const clone = structuredClone(cita);
                cargarEdicion(clone);
            };

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('mt-10', 'flex', 'justify-between');
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregando la informacion a la cita
            citaDiv.appendChild(citaPaciente);
            citaDiv.appendChild(citaPropietario);
            citaDiv.appendChild(citaEmail);
            citaDiv.appendChild(citaFecha);
            citaDiv.appendChild(citaSintomas);
            citaDiv.appendChild(contenedorBotones);
            
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

    // Comprueba si se debe editar un registro
    if(editando){
        
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
}




