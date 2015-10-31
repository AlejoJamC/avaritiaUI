/**
 * Copyright (c) 2015-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * agregarRutas
 *
 * @description configura todas las rutas del proyecto en express app
 *
 * @param {express}      app      El Router de la aplicación
 */
function agregarRutas (app){
    // Instancio los archivos que contienen las rutas
    var indexRoutes = require('./index');

    // Asigno las ruta
    // Index
    app.use('/', indexRoutes);
}
// Exportamos la funcion
module.exports.agregarRutas = agregarRutas;