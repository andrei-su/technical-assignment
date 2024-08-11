import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { configDotenv } from 'dotenv';
import {
  addUser,
  removeUser,
  getUser,
  getUsers,
  getUsersInRoom,
} from "./users.js";
import cors from 'cors';

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('signup', (userName, callback) => {
    const { error, user } = addUser({ id: socket.id, name: userName });

    if(error) return callback(error);

    console.log('User: ', user, ' Signed UP');

    callback();
  });

  socket.on('startConversation', (userName, callback) => {
  });

  socket.on('joinRoom', (userName, callback) => {
  });

  socket.on('sendMessage', (message, callback) => {
    console.log('sendMessage: ', message);
    socket.broadcast.emit('receiveMessage', message);
    // socket.emit('receiveMessage', `${getUser(socket.id).name} said ${message}`);
    callback();
  });

  socket.on('disconnect', () => {
    console.log('Disconnect Socket ID', socket.id);

    const user = removeUser(socket.id);
    console.log('User: ', user, 'Disconnected');

    socket.emit('logout', 'Hi');
  })
});

app.get("/", (req, res) => {
  res.send("Server is running..." + new Date());
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
