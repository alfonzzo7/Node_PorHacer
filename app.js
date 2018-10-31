const { argv } = require('./config/yargs');
const colors = require('colors');

const { crear, listar, actualizar, borrar, borrarTodas } = require('./por-hacer/por-hacer')

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.desc);
        console.log(tarea);
        break;
    case 'listar':
        let tareas = listar(argv.completadas);

        if (tareas.length <= 0) {
            console.log('No hay tareas'.yellow);
            break;
        }

        for (const tarea of tareas) {
            console.log('============Por Hacer============'.green);
            console.log(tarea.descripcion);
            console.log(tarea.completado ? 'Completada'.blue : 'Pendiente'.red);
            console.log('================================='.green);
        }

        break;
    case 'actualizar':
        if (actualizar(argv.desc, argv.completado)) {
            console.log('Se actualizo la tarea'.green);
        } else {
            console.log('No se encontro la tarea'.red);
        }
        break;

    case 'borrar':
        if (borrar(argv.desc)) {
            console.log('Se borro la tarea correctamente'.green);
        } else {
            console.log('No se encontro la tarea'.red);
        }
        break;

    case 'borrarTodas':
        let mensaje = borrarTodas(argv.completadas);
        console.log(`${mensaje}`.green);
        break;

    default:
        console.log('Comando no valido');
        break;
}