import { Tarea } from "./tarea.js";


class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
           listado.push(this._listado[key]);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i+1}.`.green
            console.log(`${idx} ${tarea.desc} :: ${tarea.completadoEn?'Completada'.green : 'Pendiente'.red}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        const tareas = this.listadoArr.filter(tarea => completadas? tarea.completadoEn !== null : tarea.completadoEn === null)
        tareas.forEach((tarea, i) => {
            const idx = `${i+1}.`.green
            console.log(`${idx} ${tarea.desc} :: ${tarea.completadoEn?tarea.completadoEn : 'Pendiente'.red}`);
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

export {Tareas};
