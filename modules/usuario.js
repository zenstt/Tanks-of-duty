"use strict";
var mysql = require('mysql');
class usuario {
    constructor(nombre, mysqlconnect) {
            this._nombre = nombre;
            this._mysqlconnection = mysqlconnect;
            this._id = null;
            this._provider = "local";
            this._foto = 'https://avatars1.githubusercontent.com/u/20266135?v=3&s=460';
            this._password = null;
            this._email = null;
        }
        // ---- Getters ------ //
    get nombre() {
        return this._nombre;
    }
    get id() {
        return this._id;
    }
    get provider() {
        return this._provider;
    }
    get foto() {
        return this._foto;
    }
    get password() {
        return this._password;
    }
    get email() {
        return this._email;
    }

    // ---- Setters ------ //
    set local(objeto) {
        this._password = objeto.password;
        this._email = objeto.email;
    }
    set oneClickLogin(objeto) {
        this._id = objeto.id;
        this._provider = objeto.provider;
        this._foto = objeto.foto;
    }
    set foto(foto) {
        this._foto = foto;
    }
    set password(value) {
        this._password = value;
    }

    // ---- Funciones ------ //
    /**
     * Se encarga del registro de usuario por one Click(Twitter,Facebook y Google)
     *      
     * la IDred será una combinación de la id propia del usuario y la primera letra de su provider
     * 
     * primero hace una comprobación de si el usuario existe en nuestra base de datos con la query comprobar,
     * si no, lo meterá en la base de datos
     * 
     * si no conecta devolvera un error, y un 2:este es un error interno
     * si conecta, y encuentra que el usuario ya existe devolvera un 1 y la id del usuario en nuestra base de datos
     * en caso de que no, al meterlo en la base de datos, devolvera un 0 y la id del usuario en nuestra base de datos
     *
     * 1 y 0 son tecnicamente lo mismo para la callback, pero lo dejo por si es necesario hacer algo con 
     * los usuarios nuevos
     * 
     * @param {Function} cb Callback que hará lo necesario: le devolvemos el error, el codigo dado 
     * y la id en nuestra base de datos
     */
    OneClick(cb) {
        let IDred = this._id + this._provider[0];
        const comprobar = 'SELECT ID FROM usuarios.usuario where IDred = "' + IDred + '"';
        const insertar = 'INSERT INTO usuarios.usuario (IDred, username, provider, photo) VALUES ("' + IDred + '", "' + this._nombre + '", "' + this._provider + '", "' + this._foto + '");';
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(comprobar, (err, rows) => {
                if (err) {
                    return cb(err, 2);
                } else if (rows.length) {
                    cliente.end();
                    return cb(err, 1, rows[0].ID);
                } else {
                    cliente.query(insertar, (err, rows) => {
                        if (err) {
                            return cb(err, 2);
                        } else {
                            return cb(err, 0, rows.insertId);
                        }
                    });
                }
            });
        });
    }

     /**
     * Se encarga del registro de usuario local
     *
     * primero hace una comprobación de si el usuario existe en nuestra base de datos con la query comprobar,
     * si no, lo meterá en la base de datos
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * si conecta, y encuentra que el usuario ya existe devolvera un 1 : significara que el usuario local ya existe
     * en caso de que no, al meterlo en la base de datos, devolvera un 0 y la id del usuario en nuestra base de datos
     * 
     * @param {Function} cb Callback que hará lo necesario: le devolvemos el error, el codigo dado 
     * y la id en nuestra base de datos
     * @return {Function}    cb
     */
    registrarLocal(cb) {
        const comprobar = 'SELECT * FROM usuarios.usuario where username = "' + this._nombre + '" and provider = "local"';
        const insertar = 'INSERT INTO usuarios.usuario (username, provider, password, email) VALUES ("' + this._nombre + '", "' + this._provider + '", "' + this._password + '", "' + this._email + '");';
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(comprobar, (err, rows) => {
                if (err) {
                    return cb(err, 2);
                } else if (rows.length) {
                    cliente.end();
                    return cb(err, 1);
                } else {
                    cliente.query(insertar, (err, rows) => {
                        cliente.end();
                        if (err) {
                            return cb(err, 2);
                        } else {
                            return cb(err, 0, rows.insertId);
                        }
                    });
                }
            });
        });
    }
    /**
     * Se encarga del login de usuario local
     *
     * hace una comprobación de si el usuario existe en nuestra base de datos con la query comprobar
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * si conecta, y no encuentra el usuario devolvera un 1 : significara que el usuario local no existe
     * en caso de encontrarlo devolvera un 0 y la id del usuario en nuestra base de datos
     * 
     * @param {Function} cb Callback que hará lo necesario: le devolvemos el error, el codigo dado 
     * y la id en nuestra base de datos
     * @return {Function}    cb
     */
    logLocal(cb) {
        const comprobar = 'SELECT ID FROM usuarios.usuario where username = "' + this._nombre + '" and provider = "local" and password="' + this._password + '"';
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(comprobar, (err, rows) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else if (rows.length) {
                    return cb(err, 0, rows[0].ID);
                } else {
                    return cb(err, 1)
                }
            });
        });
    }
    /**
     * Se encarga de recoger la info del usuario local desde la base de datos por la id
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * si conecta, y no encuentra el usuario devolvera un 1 : significara que el usuario local no existe
     * en caso de encontrarlo devolvera un 0 y la informacion del usuario en nuesta base de datos
     * 
     * @param  {number}   id id del usuario en nuestra base de datos
     * @param  {Function} cb Callback que hará lo necesario: le devolvemos el error, el codigo dado y los datos del usuario con esa id
     * @return {Function}    cb
     */
    getDataById(id, cb) {
        const buscar = 'SELECT ID,username,provider,photo,email FROM usuarios.usuario where ID = "' + id + '"';
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(buscar, (err, rows) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else if (rows.length) {
                    return cb(err, 0, rows[0]);
                } else {
                    return cb(err, 1)
                }
            });
        });
    }
    /**
     * Se encarga de editar la info del usuario local en la base de datos por la id
     *
     * Hay que dar la info del usuario mediante setters
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * en caso de cambiarlo correctamente devolvera un 0 
     * 
     * @param  {number}   id id del usuario en nuestra base de datos
     * @param  {Function} cb Callback que hará lo necesario: le devolvemos el error y el codigo dado
     * @return {Function}    cb
     */
    editarUsuario(id, cb) {
        const modificar = "UPDATE usuarios.usuario SET username='" + this._nombre + "', photo='" + this._foto + "',email='" + this._email + "' WHERE ID='" + id + "'";
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(modificar, (err) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else {
                    return cb(err, 0);
                }
            });
        });
    }
    /**
     * Se encarga de editar la contraseña del usuario LOCAL en la base de datos por la id
     *
     * Hay que dar la contraseña nueva del usuario mediante setters
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * en caso de cambiarla correctamente devolvera un 0 
     * 
     * @param  {number}   id id del usuario en nuestra base de datos
     * @param  {Function} cb Callback que hará lo necesario: le devolvemos el error y el codigo dado
     * @return {Function}    cb
     */
    cambiarContra(id, cb) {
        const modificar = "UPDATE usuarios.usuario SET password='" + this._password + "' WHERE ID='" + id + "'";
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(modificar, (err) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else {
                    return cb(err, 0);
                }
            });
        });
    }
    /**
     * Se encarga de consultar los tanques que tiene el jugador dado por el id
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * si conecta, y no encuentra tanques devolvera un 1 : significara que el usuario no tiene tanques
     * en caso de encontrar correctamente devolvera un 0 y la informacion de los tanques del usuario
     * 
     * @param  {number}   id id del usuario en nuestra base de datos
     * @param  {Function} cb Callback que hará lo necesario: le devolvemos el error , el codigo dado y todos los tanques en un array
     * @return {Function}    cb
     */
    consultarTanques(id, cb) {
        const buscar = 'SELECT ID,nombre,hp,ammo,urlia FROM usuarios.tanque where usuario = "' + id + '"';
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(buscar, (err, rows) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else if (rows.length) {
                    return cb(err, 0, rows);
                } else {
                    return cb(err, 1)
                }
            });
        });
    }
    /**
     * Se encarga de crear un tanque para el jugador dado por el id
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * en caso de insertar correctamente devolvera un 0
     * 
     * @param  {number}   id id del usuario en nuestra base de datos
     * @param  {Object}   tanque un objeto tanque creado con los datos necesarios
     * @param  {Function} cb Callback que hará lo necesario: le devolvemos el error y el codigo dado
     * @return {Function}    cb
     */
    crearTanque(id, tanque, cb) {
        const crear = "INSERT INTO usuarios.tanque (nombre, hp, ammo, urlia, usuario) VALUES ('" + tanque.nombre + "', '" + tanque.vida + "', '" + tanque.muni + "', '" + tanque.IA + "', '" + id + "');";
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(crear, (err, rows) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else {
                    return cb(err, 0);
                }
            });
        });
    }
    /**
     * Se encarga de borrar el tanque que tiene el id dado para el jugador dado por el id
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * en caso de borrar correctamente devolvera un 0
     * 
     * @param  {number}   id id del usuario en nuestra base de datos
     * @param  {number}   idtanque id del tanque en nuestra base de datos
     * @param  {Function} cb Callback que hará lo necesario: le devolvemos el error y el codigo dado
     * @return {Function}    cb
     */
    borrarTanque(id, idtanque, cb) {
        const borrar = "DELETE FROM usuarios.tanque WHERE ID='" + idtanque + "' and usuario='" + id + "';";
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(borrar, (err, rows) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else {
                    return cb(err, 0);
                }
            });
        });
    }
    /**
     * Se encarga de modificar el tanque con el id mediante un objeto tanque para el jugador dado por el id
     * 
     * si no conecta devolvera un error, y un 2: este es un error interno
     * en caso de borrar correctamente devolvera un 0
     * 
     * @param  {number}   id id del usuario en nuestra base de datos
     * @param  {Object}   tanque un objeto tanque creado con los datos nuevos
     * @param  {Function} cb Callback que hará lo necesario: le devolvemos el error y el codigo dado
     * @return {Function}    cb
     */
    modificarTanque(id, tanque, idtanque, cb) {
        const modificar = "UPDATE usuarios.tanque SET nombre='" + tanque.nombre + "', hp='" + tanque.vida + "', ammo='" + tanque.muni + "', urlia='" + tanque.IA + "' WHERE ID='" + idtanque + "' and usuario='" + id + "';";
        let cliente = mysql.createConnection(this._mysqlconnection);
        cliente.connect((err) => {
            if (err) {
                return cb(err, 2);
            }
            cliente.query(modificar, (err, rows) => {
                cliente.end();
                if (err) {
                    return cb(err, 2);
                } else {
                    return cb(err, 0);
                }
            });
        });
    }
}
module.exports = usuario;