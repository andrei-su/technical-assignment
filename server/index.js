import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { configDotenv } from 'dotenv';
import cors from 'cors';

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(`A user connected with the id: ${socket.id}`);

  socket.on('sendMessage', (message, callback) => {
    console.log(message);
    socket.broadcast.emit('receiveMessage', message);
    callback();
  });

});

app.get("/", (req, res) => {
  res.send("Server is running..." + new Date());
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
