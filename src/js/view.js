import { montarPaginacao, render, removeContactsList, removePageList } from '../index.js'
import { isNullOrUndefined } from 'util';
//botao novo
let titulo = document.getElementById('new-title');
let modal = document.getElementById('modal-add-edit');
let btnNew = document.getElementById('btn-new');
let span = document.getElementsByClassName('close')[0];
btnNew.onclick = () => {
    modal.style.display = 'block';
    titulo.innerHTML = 'Novo Contato';
    document.getElementById('form-new-edit').reset()
}
span.onclick = () => {
    modal.style.display = 'none';
}

let btnBack = document.getElementById('back')
let btnForward = document.getElementById('forward')

btnBack.onclick = () => {
    if (!isNullOrUndefined(document.getElementsByClassName('currentPage')[0])) {
        console.log("funcionou")
        document.getElementById(window.state.currentPage).classList.remove('currentPage')
    }
    let page = 1
    if (window.state.currentPage != 1) {
        page = window.state.currentPage - 1
    }
    window.state = {
        ...window.state,
        currentPage: page
    }

    let control = (window.state.currentPage % 6)

    if (control > 0) {
        removeContactsList()
        render()
    } else if (control == 0) {
        let array = window.state.currentArray - 1
        window.state = {
            ...window.state,
            currentArray: array
        }
        removeContactsList()
        removePageList()
        montarPaginacao()
        render()
    }
    document.getElementById(window.state.currentPage).classList.add('currentPage')
}
btnForward.onclick = () => {
    if (!isNullOrUndefined(document.getElementsByClassName('currentPage')[0])) {
        console.log("funcionou")
        document.getElementById(window.state.currentPage).classList.remove('currentPage')
    }
    let page = window.state.currentPage + 1
    if (page > window.state.contacts.length) {
        page = window.state.contacts.length
    }
    window.state = {
        ...window.state,
        currentPage: page
    }

    let control = calculateControl()
    if (control <= 1) {
        removeContactsList()
        render()
    } else if (control > 1) {
        let array = window.state.currentArray + 1

        window.state = {
            ...window.state,
            currentArray: array
        }
        removeContactsList()
        removePageList()
        montarPaginacao()
        render()
    }
    document.getElementById(window.state.currentPage).classList.add('currentPage')
}

function calculateControl() {
    let array = 1;
    if (window.state.currentArray > 0) {
        array = window.state.currentArray + 1
    }
    return (window.state.currentPage / array) / 6
}

let select = document.getElementsByTagName('select')
//https://developer.mozilla.org/en-US/docs/Web/Events/change
select.onclick=()=>{
    console.log(select.selectedIndex)
}