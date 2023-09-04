const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

var servidor = {}
servidor.user = 'abc'
servidor.senha = 'abc'  

app.use(express.static('public/teste/'));

var servidor = {}
io.on('connection', (socket) => {
    console.log('cliente conectado, id '+socket.id);
    socket.on('disconnect', () => {
        console.log('cliente desconectado, id '+socket.id);
    });
    socket.on('servidor', (msg) => {
        
        if(msg.tipo=='entrar') {
            if (msg.nome=='abc') {
                if (msg.senha=='abc') {
                    console.log('cliente logado, id'+socket.id);
                    servidor[socket.id+'nome'] = msg.nome
                    servidor[socket.id+'senha'] = msg.senha 
                    io.to(socket.id).emit('servidor', {tipo:'entrar'})
                } else {
                    io.to(socket.id).emit('servidor', {tipo:'alert', texto:'dados errado'})
                }
            } else {
                io.to(socket.id).emit('servidor', {tipo:'alert', texto:'dados errado'})
            }
        }
        
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});