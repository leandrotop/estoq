const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

var servidor = {}

app.use(express.static('public/'));

var servidor = {}
io.on('connection', (socket) => {
    console.log('cliente conectado, id '+socket.id);
    socket.on('disconnect', () => {
        console.log('cliente desconectado, id '+socket.id);
        servidor[socket.id+'logado'] = false
    });
    socket.on('servidor', (msg) => {
        
        if(msg.tipo=='entrar') {
            if (servidor[msg.nome+'_senha']==msg.senha) {
                console.log('cliente logado, id'+socket.id);
                servidor[socket.id] = msg.nome
                io.to(socket.id).emit('servidor', {tipo:'entrar'})
            } else {
                io.to(socket.id).emit('servidor', {tipo:'alert', texto:'Dados errado'})
            }
        }

        if (msg.tipo=='criar') {
            if (servidor[msg.nome]) {
                io.to(socket.id).emit('servidor', {tipo:'alert', texto:'Nome indisponível'})
            } else {
                servidor[socket.id] = msg.nome
                servidor[msg.nome] = true
                servidor[msg.nome+'_key_item'] = 0
                servidor[msg.nome+'_nome'] = msg.nome
                servidor[msg.nome+'_senha'] = msg.senha 
                servidor[servidor[socket.id]+'_carga'] = ''
                io.to(socket.id).emit('servidor', {tipo:'criar'})
            }
        }

        if (msg.tipo=='add') {
            servidor[servidor[socket.id]+'_nome_item'+servidor[servidor[socket.id]+'_key_item']] = msg.nome
            if (servidor[servidor[socket.id]+'_key_item'] % 2 == 0) {
                _carga = `
                
                <div style="background-color: #e9e9e9; width: 90vw; height: 100px; display: flex; justify-content: center; align-content: center;" id="${servidor[servidor[socket.id]+'_key_item']}" onclick="item(this)">
                    <div style="width: 70%; display: flex; justify-content: center; align-content: center;">
                        <h3 style="font-size: 40px; display: flex; align-items: center;">${msg.nome}</h3>
                    </div>
                    <div style="width: 30%; display: flex; justify-content: center; align-content: center;">
                        <h3 style="font-size: 40px; display: flex; align-items: center;" id="quantidade ${servidor[servidor[socket.id]+'_key_item']}">0</h3>
                    </div>
                </div>
                
                `
            } else {
                _carga = `
                
                <div style="background-color: #f1f1f1; width: 90vw; height: 100px; display: flex; justify-content: center; align-content: center;" id="${servidor[servidor[socket.id]+'_key_item']}" onclick="item(this)">
                    <div style="width: 70%; display: flex; justify-content: center; align-content: center;">
                        <h3 style="font-size: 40px; display: flex; align-items: center;">${msg.nome}</h3>
                    </div>
                    <div style="width: 30%; display: flex; justify-content: center; align-content: center;">
                        <h3 style="font-size: 40px; display: flex; align-items: center;"id="quantidade ${servidor[servidor[socket.id]+'_key_item']}">0</h3>
                    </div>
                </div>
                
                `
            }
            servidor[servidor[socket.id]+'_quatidade_item'+servidor[servidor[socket.id]+'_key_item']] = 0
            servidor[servidor[socket.id]+'_carga'] += _carga
            servidor[servidor[socket.id]+'_key_item'] += 1
            io.to(socket.id).emit('servidor', {tipo: 'add'})
            io.to(socket.id).emit('servidor', {tipo: 'alert', texto: 'Adicionado', key: servidor[servidor[socket.id]+'_key_item']})
            console.log(servidor);
        }

        if (msg.tipo=='coletar') {
            servidor[servidor[socket.id]+'_quatidade_item'+msg.itemId] = msg.quantidade
            io.to(socket.id).emit('servidor', {tipo: 'coletar'})
            io.to(socket.id).emit('servidor', {tipo: 'alert', texto: 'Editado'})
        }

        if (msg.tipo=='carga') {
            io.to(socket.id).emit('servidor', {tipo: 'carga1', carga: servidor[servidor[socket.id]+'_carga']})
            for (i = 0; i < servidor[servidor[socket.id]+'_key_item']; i++) {
                io.to(socket.id).emit('servidor', {tipo: 'carga2', itemId: i, quantidade: servidor[servidor[socket.id]+'_quatidade_item'+i]})   
            }
        }
        
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});