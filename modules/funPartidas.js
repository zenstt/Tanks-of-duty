"use strict";
var express = require('express');
var mysql = require('mysql');
var BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var config = require('./conf.js');

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'estonoesuncifrado',
    resave: true,
    saveUninitialized: false
}));

