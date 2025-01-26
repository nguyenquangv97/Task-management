import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import { initialTasks } from './data/index.js';
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let currentTasks = {
  newTasks: initialTasks.filter(task => task.stage === 'new'),
  inProgressTasks: initialTasks.filter(task => task.stage === 'inProgress'),
  doneTasks: initialTasks.filter(task => task.stage === 'done'),
};

// when creating a new task on the front end, receive the list of tasks for that stage and emit to all clients
io.on('connection', (socket) => {
  console.log('a user connected');

  // Send the current state of tasks to the newly connected user
  socket.emit('updateTasks', currentTasks);

  socket.on('createTask', (updatedTasks) => {
    currentTasks = updatedTasks;
    io.emit('updateTasks', updatedTasks);
  });

  socket.on('updateTasks', (updatedTasks) => {
    currentTasks = updatedTasks;
    io.emit('updateTasks', updatedTasks);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
