
//botao novo
let titulo = document.getElementById('new-title');
let modal = document.getElementById('modal-add-edit');
let btnNew = document.getElementById('btn-new');
let span = document.getElementsByClassName('close')[0];
btnNew.onclick = ()=>{
    modal.style.display = 'block';
    titulo.innerHTML = 'Novo Contato';
}
span.onclick = ()=>{
    modal.style.display = 'none';
}


            
/** /editar e excluir
let btnEdit = document.getElementById('btn-edit');
let btnExclude = document.getElementById('btn-exclude');
btnEdit.onclick = ()=>{
    modal.style.display = 'block';
    titulo.textContent = 'Editar Contato';
}


btnExclude.onclick = ()=>{
    confirm('Deseja mesmo excluir esse registro?');
}

window.onclick = event =>{
    if(event.target == modal){
        modal.style.display = 'none';
    }
}
*/

