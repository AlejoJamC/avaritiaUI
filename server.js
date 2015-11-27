/**
 * Copyright (c) 2015-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Required packages
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
// TODO: arreglar la carga de archivos con multer [1]
//var multer = require('multer');
var errorHandler = require('errorhandler');
var moment = require('moment');
var routes = require('./routes/routes');

//Crea variable ambiente
var environment = 'devLocal';
// Asigna el modulo a la variable configuracion
var configuracion = require('./config/environment.json')[environment];

// Configuramos variables globales
global.BEARERTOKEN = configuracion.bearer;
global.WEBSERVICE = configuracion.webservice;

//Asigna el puerto de la configuracion --Entorno local
var puerto = process.env.PORT || configuracion.port;

// Declara la nueva aplicacion de express
var app = express();

// Se cargan las configuraciones y los paquetes para esta nueva app de express
// Puerto
app.set('port', puerto);
// Configurar vista (Views) y el template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Ubicacion del Favicon
app.use(favicon(__dirname + '/public/favicons/favicon.ico'));
// Logger de Express
app.use(logger('dev'));
// Permitir utilizar verbos HTTP en todos los clientes
app.use(methodOverride());
// Sesiones
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: '3f1l 4 73g 0t d33n yll43r u s1ht d43r n4c u f1' }));
// Parser del contenido en el body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// TODO: arreglar la carga de archivos con multer [2]
// Manejador de multipart/form-data para cargar archivos
//app.use(multer());
// Importando arhivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Variables locales
// Año actual
app.locals.currentYear = moment().year();

// Utiliza el metodo AgregarRutas
routes.agregarRutas(app);

/// Manejador de 404
app.use(function(req, res, next) {
  'use strict';
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var env = process.env.NODE_ENV || environment;
if ('devLocal' === env){
  app.use(errorHandler());
}

app.listen(app.get('port'), function(){
  console.log('AVARITIA website listening on port ' + puerto);
});