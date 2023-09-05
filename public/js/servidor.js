var socket = io();

function servidor_entrar() {
    socket.emit('servidor', {tipo: 'entrar',nome:document.getElementById('(input)entrar-nome').value,senha:document.getElementById('(input)entrar-senha').value})
}

function servidor_criar() {
    socket.emit('servidor', {tipo: 'criar',nome:document.getElementById('(input)entrar-nome').value,senha:document.getElementById('(input)entrar-senha').value})
}

socket.on('servidor', function(msg) {

    if (msg.tipo=='entrar') {
        tela('menu')
    }

    if (msg.tipo=='criar') {
        tela('menu')
    }

    if (msg.tipo=='add') {
        document.getElementById('(input)add-nome').value = ''
        tela('menu')
    }

    if (msg.tipo=='carga') {
        document.getElementById('tabela').innerHTML = msg.carga
    }

    if (msg.tipo=='alert') {
        alert(msg.texto)
    }

});

function servidor_add() {
    socket.emit('servidor', {tipo: 'add',nome: document.getElementById('(input)add-nome').value,})
}