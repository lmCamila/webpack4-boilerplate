let modal = document.getElementById('modal-add-edit');
let btnNew = document.getElementById('btn-new');
let btnEdit = document.getElementById('btn-edit');
let btnExclude = document.getElementById('btn-exclude');
let titulo = document.getElementById('new-title');
let span = document.getElementsByClassName('close')[0];

btnNew.onclick = ()=>{
    modal.style.display = 'block';
    titulo.innerHTML = 'Novo Contato';
}

btnEdit.onclick = ()=>{
    modal.style.display = 'block';
    titulo.textContent = 'Editar Contato';
}

span.onclick = ()=>{
    modal.style.display = 'none';
}

btnExclude.onclick = ()=>{
    confirm('Deseja mesmo excluir esse registro?');
}

window.onclick = event =>{
    if(event.target == modal){
        modal.style.display = 'none';
    }
}