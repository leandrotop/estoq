var socket = io();

function servidor_entrar() {
    socket.emit('servidor', {tipo: 'entrar',nome:document.getElementById('(input)entrar-nome').value,senha:document.getElementById('(input)entrar-senha').value})
}

function servidor_criar() {
    socket.emit('servidor', {tipo: 'criar',nome:document.getElementById('(input)entrar-nome').value,senha:document.getElementById('(input)entrar-senha').value})
}

function servidor_add() {
    socket.emit('servidor', {tipo: 'add',nome: document.getElementById('(input)add-nome').value,})
}

function servidor_coletar() {
    socket.emit('servidor', {tipo: 'coletar', itemId: btnId, quantidade: document.getElementById('(input)add-coletar').value,})
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

    if (msg.tipo=='carga1') {
        document.getElementById('tabela').innerHTML = msg.carga
    }

    if (msg.tipo=='carga2') {
        document.getElementById(['quantidade '+msg.itemId]).innerText = msg.quantidade
    }

    if (msg.tipo=='alert') {
        alert(msg.texto)
    }

    if (msg.tipo=='coletar') {
        document.getElementById('(input)add-coletar').value = ''
        tela('menu')
    }

})