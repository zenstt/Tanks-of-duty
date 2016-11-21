"use strict";
class usuario {
    constructor(nombre) {
            this._nombre = nombre;
            this._id = null;
            this._provider = "local";
            this._foto = 'https://avatars1.githubusercontent.com/u/20266135?v=3&s=460';
            this._password = null;
            this._correo = null;
            this._idtabla;
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
    get correo() {
        return this._correo;
    }
    get idtabla() {
            return this._idtabla;
        }
        // ---- Setters ------ //
    set local(objeto) {
        this._password = objeto.password;
        this._correo = objeto.correo;
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
    // // const sql = 'INSERT INTO usuarios.usuario (IDred, username, provider, photo, password, email) VALUES ("' + this._id + '", "' + this._nombre + '", "' + this._provider + '", "' + this._foto + '", "' + this._password + '", "' + this._correo + '");';
    registrarLocal() {
        const comprobar = 'SELECT * FROM usuarios.usuario where username = "' + this._nombre + '" and provider = "local"';
        const insertar = 'INSERT INTO usuarios.usuario (username, provider, password, email) VALUES ("' + this._nombre + '", "' + this._provider + '", "' + this._password + '", "' + this._correo + '");';
        let cliente = mysql.createConnection(mysqlconnection);
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
                    cliente.query(insertar, (err) => {
                        if (err) {
                            return cb(err, 2);
                        } else {
                            return cb(err, 0);
                        }
                    });
                }
            });
        });
    }
}
module.exports = usuario;