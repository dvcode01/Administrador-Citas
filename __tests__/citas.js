
import { AdminCitas } from '../js/classes/AdminCitas';

describe('Probando las funciones de la clase AdminCitas', () => {
    const citas = new AdminCitas();

    test('Agregar una nueva cita', () =>{
        
        const citaObj = {
            id: crypto.randomUUID(),
            paciente: 'Zeus',
            propietario: 'Jesus',
            email: 'correo@correo.com',
            fecha: '2025-09-12',
            sintomas: 'vomitos'
        };

        citas.agregar(citaObj);

        // Prueba
        expect(citas).toMatchSnapshot();


    });

});