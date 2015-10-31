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

module.exports = routerIndex;