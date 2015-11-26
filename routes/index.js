/**
 * Copyright (c) 2015-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

var express = require('express');
var routerIndex = express.Router();
var request = require('request');

/* GET home page. */
routerIndex.get('/', function (req, res) {
  res.render('index', { title: 'Avaritia | Simulador de crédito para banca personal.' });
});

/* POST Contact form. */
routerIndex.post('/contacto', function (req, res) {
  var options = {
    'url' : global.WEBSERVICE + '/contacts',
    'auth':{
      'bearer' : global.BEARERTOKEN
    },
    'form':{
      'name': req.body.txtname,
      'lastname': req.body.txtlastname,
      'email': req.body.txtemail,
      'message': req.body.txtmessage
    }
  };

  request.post(options, function (error, response, body) {
    if( !error && response.statusCode == 200){
      var info = JSON.parse(body);
      // TODO: imprimir el mensaje error
      res.render('index', {
        title: 'Avaritia | Simulador de crédito para banca personal.',
        error: false,
        messageContact: info.message
      });
    }
  });
});

module.exports = routerIndex;