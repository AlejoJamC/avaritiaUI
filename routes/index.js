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

/* GET simulate page. */
//routerIndex.get('/simular', function (req, res) {
//  res.redirect('/');
//});

/* POST simulate and result page. */
routerIndex.post('/simular', function (req, res) {
  // TODO: traducir al ingles estas variables y funciones
  var tipotasa = req.body.cbxtasa;
  var textotasa = req.body.txttasa;
  var tiposervicio = req.body.cbxservicio;
  var textoservicio = req.body.txtservicio;
  var ingresos = req.body.txtingresosmensuales;
  var noingresos = req.body.txtingresosmensuales;
  var prestamo = req.body.txtvalorprestamo;
  var noprestamo = req.body.txtvalorprestamo;
  var meses = req.body.txtvalormeses;
  var tasa = 30;
  var tasames = tasa/12;

  ingresos = ingresos.split('.').join('');
  prestamo = prestamo.split('.').join('');

  console.log(tipotasa);
  console.log(tiposervicio);
  console.log(ingresos);
  console.log(prestamo);
  console.log(meses);
  console.log(tasames);
  console.log(textotasa);
  console.log(textoservicio);

  // Get the list of all banks, with rate type and service selected
  var options = {
    'url' : global.WEBSERVICE + '/banks',
    'auth':{
      'bearer' : global.BEARERTOKEN
    }
  };

  request.get(options, function (error, response, body) {
    if( !error && response.statusCode == 200){
      var banks = JSON.parse(body);
      console.log(banks);
      res.render('result', {
        title: 'Avaritia | Simulación exitosa',
        error: false,
        banks: banks,
        ingresos: noingresos,
        noprestamo: noprestamo,
        prestamo: prestamo,
        meses: meses,
        textotasa: textotasa,
        idtasa: tipotasa,
        textoservicio: textoservicio,
        idservicio: tiposervicio,
        tokentemp: global.BEARERTOKEN
      });
    }
  });
});



module.exports = routerIndex;