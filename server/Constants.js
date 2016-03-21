'use strict';

var path = require('path');

var mkdirp = require('mkdirp');

var pkg = require('../package.json');
require('dotenv').config({
  path: path.join(__dirname, '..', '.env'),
  silent: true
});

var name = pkg.name;

var topDir = path.join(__dirname, '..');

var port = process.env.PORT || 3000;

var baseUrl = process.env.BASE_URL || 'http://localhost:' + port;

module.exports = {
  name: name,
  domain: 'upcal-admin.com',
  description: pkg.description,
  npmVersion: pkg.version,
  gitVersion: process.env.npm_package_gitHead,
  topDir: topDir,
  port: port,
  logLevel: process.env.LOG_LEVEL || 'debug',
  env: env
};