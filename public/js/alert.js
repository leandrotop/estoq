function alert(_mensagem) {
    document.getElementById('alert').style.display = 'flex'
    document.getElementById('textAlert').innerText = _mensagem
}
function btnAlert() {
    document.getElementById('alert').style.display = 'none'
    document.getElementById('textAlert').innerText = ''
}