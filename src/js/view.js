//botao novo
let titulo = document.getElementById('new-title');
let modal = document.getElementById('modal-add-edit');
let btnNew = document.getElementById('btn-new');
let span = document.getElementsByClassName('close')[0];
btnNew.onclick = ()=>{
    modal.style.display = 'block';
    titulo.innerHTML = 'Novo Contato';
    document.getElementById('form-new-edit').reset()
}
span.onclick = ()=>{
    modal.style.display = 'none';
}

 