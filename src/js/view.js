import{montarPaginacao,render,removeContactsList,removePageList} from '../index.js'
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

let btnBack = document.getElementById('back')
let btnForward = document.getElementById('forward')

btnBack.onclick = () => {
    console.log('back')
    let control = (window.state.currentPage/window.state.currentArray) / 6
    console.log(control)
    if (window.state.currentPage == 1) {
        window.state = {
            ...window.state,
            currentPage: window.state.currentPage
        }
    }else if (control <= 1) {
        window.state = {
            ...window.state,
            currentPage: window.state.currentPage - 1
        }
        removeContactsList()
        render()
    } else if (control > 1) {
        window.state = {
            ...window.state,
            currentPage: window.state.currentPage - 1,
            currentArray: window.state.currentArray - 1
        }
        removeContactsList()
        removePageList()
        montarPaginacao()
        render()
    }
}
btnForward.onclick = () => {
    let  page =window.state.currentPage + 1
    window.state = {
        ...window.state,
        currentPage: page
    }
    let control = calculateControl()
    if (control < 1) {
        removeContactsList()
        render()
    } else if (control >= 1) {
        let array = window.state.currentArray + 1   
        window.state = {
            ...window.state,
            currentArray:array
        }
        removeContactsList()
        removePageList()
        montarPaginacao()
        render() 
    }
}

function calculateControl(){
    let array = 1;
    if(window.state.currentArray > 0){
        array=window.state.currentArray +1
    }
    return (window.state.currentPage/ array) / 6
}


