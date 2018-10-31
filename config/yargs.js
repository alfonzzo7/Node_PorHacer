const descripcion = {
    demand: true,
    alias: 'd'
}

const completado = {
    default: true,
    alias: 'c',
    type: 'boolean'
}

const { argv } = require('yargs')
    .command('listar', 'Muestra las tareas por hacer', {
        completadas: {
            alias: 'c',
            desc: 'Este parametro es opcional, si no se envia, se muestran todas las tareas.\n' +
                'Si se envia un true, se mostraran solo las tareas completadas\n' +
                'Si se envia un false se mostraran las tareas pendientes',
            type: 'boolean'

        }
    })
    .command('crear', 'Crea una tarea por hacer', {
        desc: descripcion
    })
    .command('actualizar', 'Actualiza el estado de una tarea', {
        desc: descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea por hacer', {
        desc: descripcion
    })
    .command('borrarTodas', 'Borra todas las tareas', {
        completadas: {
            alias: 'c',
            desc: 'Este parametro es opcional, si no se envia, se borran todas las tareas.\n' +
                'Si se envia un true, se borraran solo las tareas completadas\n' +
                'Si se envia un false se borraran las tareas pendientes',
            type: 'boolean'

        }
    })
    .help();

module.exports = {
    argv
}