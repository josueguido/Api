const db = require('./configuracion');


function pedirTodas(tabla, callback) {
    db.any(`SELECT * FROM ${tabla}`)
    .then(resultado => {
        callback(null, resultado);
    })
    .catch(error => {
        callback(error);
    });
}

function pedir(tabla, id, callback) {
    db.any(`SELECT * FROM ${tabla} WHERE id = ${id}`)
    .then(resultado => {
        callback(null, resultado);
    })
    .catch(error => {
        callback(error);
    });
}

function crear(tabla, item, callback) {
    const keys = Object.keys(item);
    const propiedades = keys.join(', ');
    const valores = keys.map(key => `'${item[key]}'`).join(', ');

    db.any(`INSERT INTO ${tabla} (${propiedades}) VALUES(${valores}) returning *`)
       .then(([resultado]) => {
        callback(null, resultado);
       })
       .catch(error => {
        callback(error);
       });
}


module.exports = {
    pedirTodas,
    pedir,
    crear
};