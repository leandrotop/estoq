var socket = io();

function servidor_entrar() {
    socket.emit('servidor', {tipo: 'entrar',nome:document.getElementById('(input)entrar-nome').value,senha:document.getElementById('(input)entrar-senha').value})
}

socket.on('servidor', function(msg) {

    if (msg.tipo=='entrar') {
        tela('menu')
    }

    if (msg.tipo=='alert') {
        alert(msg.texto)
    }

});