const express = require('express');
const http = require('http');
const cors = require('cors');
// socket.io import
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    method: ['GET', 'POST'],
  },
});

// when creating a new task on the front end, receive the list of tasks for that stage and emit to all clients
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('createTask', (tasks) => {
    io.emit('updateTasks', tasks);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
