const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Almacenar mensajes en memoria
let messages = [];

// Servir la página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Enviar mensajes antiguos al cliente
  socket.emit('loadMessages', messages);

  // Escuchar nuevos mensajes
  socket.on('sendMessage', (message) => {
    messages.push(message); // Guardar mensaje en memoria
    io.emit('message', message); // Emitir mensaje a todos los clientes
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
