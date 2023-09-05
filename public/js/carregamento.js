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
    document.getElementById('tela-coletar').style.display = 'none'
    if (_tela=='menu') {
        document.getElementById('tela-menu').style.display = 'block'
        socket.emit('servidor', {tipo: 'carga'})
    }
    if (_tela=='add') {
        document.getElementById('tela-add').style.display = 'block'
    }
    if (_tela=='coletar') {
        if (btnId=='noneDiv') {
            document.getElementById('tela-menu').style.display = 'block'
            alert('Selecione um item')
        } else {
            document.getElementById('tela-coletar').style.display = 'block'
        }
    }
}

var btnId = 'noneDiv'
function item(_elemento) {
    _id = _elemento.id
    document.getElementById(btnId).style.border = 'none'
    btnId = _id
    _elemento.style.border = 'solid 1px #000000'
}