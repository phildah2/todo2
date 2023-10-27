const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let todos = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('init', todos);

  socket.on('addTodo', (todo) => {
    todos.push(todo);
    io.emit('updateTodos', todos);
  });

  socket.on('removeTodo', (index) => {
    todos.splice(index, 1);
    io.emit('updateTodos', todos);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
