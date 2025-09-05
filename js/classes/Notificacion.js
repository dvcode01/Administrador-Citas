
export default class Notificacion{
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