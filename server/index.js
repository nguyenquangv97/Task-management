import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// when creating a new task on the front end, receive the list of tasks for that stage and emit to all clients
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('createTask', (updatedTasks) => {
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
