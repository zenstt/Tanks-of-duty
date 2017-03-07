"use strict"
//API para todo lo relacionado la gestión de usuarios, login, registro, modificación
var express = require('express');
var mysql = require('mysql');
var BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var usuario = require('../clases/usuario.js')
var config = require('../config/conf.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'estonoesuncifrado',
    resave: true,
    saveUninitialized: false
}));

const mysqlconnection = {
    user: "zenstt",
    password: "1234",
    // host: "52.57.173.168",
    host: "localhost",
    port: 3306
}

function logearUsuario(usuar, password, cb) {
    let usu = new usuario(usuar, mysqlconnection);
    usu.password = password;
    return usu.logLocal(cb);
}

function crearUsuario(usuar, password, email, cb) {
    let usu = new usuario(usuar, mysqlconnection);
    usu.local = {
        password: password,
        email: email
    };
    return usu.registrarLocal(cb);
}

function compOneClick(datos, done) {
    let usu = new usuario(datos.username, mysqlconnection);
    usu.oneClickLogin = datos;
    usu.OneClick((err, num, id) => {
        if (num == 2) {
            console.log(err);
            return done(null, false, {
                message: "Error en la conexion"
            });
        } else {
            console.log("Logueado correctamente");
            return done(null, {
                id: id
            });
        }
    });
}
//========================================================
//                      ENDPOINTS
//========================================================
router.post('/register', (req, res) => {
    let infoLogin = {
        error: null,
        creado: false,
    };
    crearUsuario(req.body.username, req.body.password, req.body.email, (err, num, id) => {
        switch (num) {
            case 1:
                infoLogin.error = "Xa existe o usuario na database.";
                break;
            case 2:
                infoLogin.error = "Erro interno na conexion ca database.";
                break;
            case 0:
                infoLogin.url = 'juego.html';
                infoLogin.creado = true;
                break;
        }
        /* Borrar en un futuro */
        if (num != 0) {
            console.log(infoLogin.error);
        } else {
            console.log("Rexistrado correctamente na database")
        }
        res.json(infoLogin);
        res.end();
    })
});

passport.use(new LocalStrategy(function(username, password, done) {
    let error = null;
    logearUsuario(username, password, (err, num, id) => {
        switch (num) {
            case 1:
                error = "Usuario ou contrasinal incorrecto.";
                break;
            case 2:
                error = "Erro interno.";
                console.log(err)
                break;
        }
        /* Borrar en un futuro */
        if (error) {
            console.log(error);
            return done(null, false, {
                message: "Error en la autentificación"
            });
        } else {
            console.log("Logueado correctamente");
            return done(null, {
                id: id
            });
        }
    });

}));
// -------- ONE CLICK CON TWITTER, FACEBOOK, GOOGLE -------- //
passport.use(new TwitterStrategy({
    consumerKey: config.twitter.key,
    consumerSecret: config.twitter.secret,
    callback: 'http://localhost:3000/login/auth/twittter/callback'
}, (token, tokenSecret, profile, done) => {
    let datos = {
        id: profile.id,
        username: profile.username,
        provider: profile.provider,
        foto: profile.photos[0].value
    }
    compOneClick(datos, done);
}));

passport.use(new FacebookStrategy({
        clientID: config.facebook.id,
        clientSecret: config.facebook.secret,
        callbackURL: 'http://localhost:3000/login/auth/facebook/callback'
    },
    function(token, refreshToken, profile, done) {
        let datos = {
            id: profile.id,
            username: profile.displayName.replace(" ", ""),
            provider: profile.provider,
            foto: 'graph.facebook.com/' + profile.id + '/picture'
        }
        compOneClick(datos, done);
    }));

passport.use(new GoogleStrategy({
        clientID: config.google.id,
        clientSecret: config.google.secret,
        callbackURL: "http://localhost/login/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        let datos = {
            id: profile.id,
            username: profile.displayName.replace(" ", ""),
            provider: profile.provider,
            foto: profile.photos[0].value
        }
        compOneClick(datos, done);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    let usu = new usuario('deserialize', mysqlconnection);
    usu.getDataById(user, (err, num, data) => {
        if (num == 0) {
            done(null, data);
        } else {
            console.log(err);
            return done(null, false, {
                message: "Error interno"
            });
        }
    })

});

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', passport.authenticate('local'), function(req, res) {
    if (req.isAuthenticated()) {
        res.json({
            login: true,
            url: '/juego'
        });
    } else {
        res.json({
            login: false,
            url: '/login'
        });
    }
});

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/login',
    successRedirect: '/juego'
}));

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/juego',
        failureRedirect: '/login'
    })
);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/juego',
        failureRedirect: '/login'
    })
);

router.get('/', function(req, res) {
        res.redirect('/');
    })
    // -------- TERMINA ONE CLICK -------- //
module.exports = router;