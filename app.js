import colors from 'colors';
import { pausar, inquirerMenu, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import {Tareas} from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if (tareasDB) {
        // Establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        // Imprimir el menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6': //Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id === '0') continue;
                const ok = await confirmar('¿Esta seguro?');
                if (ok) {
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada');
                }
            break;
        }

        guardarDB(tareas.listadoArr);
        
        await pausar();
    } while (opt !== '0')
}

main();