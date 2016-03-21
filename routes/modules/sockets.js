// Node.js core modules
var http = require('http');
var path = require('path');
var fs = require('fs');

// Installed dependencies
var express = require('express');
var socketIo = require('socket.io');

// Module variables
var app = express();
var server = http.createServer(app);
var io = socketIo(server);
var buzzes = [];

/*
 Attach "connection" event handler to socket.io server
 */
io.on('connection', (socket) => {

  console.log('Connected socket.io client ' + socket.id);

  // Broadcast current list of buzzes
  buzzes.forEach((name) => socket.emit('buzz', name));

  // Handler for "buzz" socket events
  socket.on('buzz', (name) => {
    // No double-buzzes
    if (buzzes.indexOf(name) === -1) {
    // Store buzz
    buzzes.push(name);
    // re-broadcast event to other connected sockets
    io.emit('buzz', name);
  }
  });

  // Handler for "reset" socket event
  socket.on('reset', () => {
    // reset buzzes Array
    buzzes = [];
  // re-broadcast to other connected sockets
  io.emit('reset');
  });

});