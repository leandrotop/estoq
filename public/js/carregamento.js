function carregamento(_status) {
    if (_status) {
        document.getElementById('carregando').style.display = 'flex'
    } else {
        document.getElementById('carregando').style.display = 'none'
    }
}

function tela(_tela) {
    document.getElementById('tela-entrar').style.display = 'none'
    document.getElementById('tela-menu').style.display = 'none'
    document.getElementById('tela-add').style.display = 'none'
    if (_tela=='menu') {
        document.getElementById('tela-menu').style.display = 'block'
        socket.emit('servidor', {tipo: 'carga'})
    }
    if (_tela=='add') {
        document.getElementById('tela-add').style.display = 'block'
    }
}