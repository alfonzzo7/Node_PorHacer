const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar la tarea', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (desc) => {
    cargarDB();

    let porHacer = {
        descripcion: desc,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const listar = (completadas = null) => {
    cargarDB();

    if (completadas != null) {
        return listadoPorHacer.filter(tarea => tarea.completado === completadas);
    } else {
        return listadoPorHacer;
    }
}

const actualizar = (desc, estado = true) => {
    cargarDB();

    if (estado !== true) {
        estado = false;
    }

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === desc;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = estado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (desc) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === desc;
    });

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrarTodas = (completadas = null) => {
    cargarDB();

    let mensaje = 'Se borraron todas las tareas';

    if (completadas != null) {
        listadoPorHacer = listadoPorHacer.filter(tarea => tarea.completado !== completadas);
        if (completadas) {
            mensaje += ' completadas';
        } else {
            mensaje += ' pendientes';
        }
    } else {
        listadoPorHacer = [];
    }
    guardarDB();
    return mensaje;
}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar,
    borrarTodas
}