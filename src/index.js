import './index.css';
import { modifyFilterSelect, searchContacts } from './js/view.js';
import { isNullOrUndefined } from 'util';
const _ = require('lodash/array')
window.state = {
    pages: [],
    currentPage: 1,
    currentArray: 0,
    contacts: [],
    favs: [],
    search: '',
    filter: ''
}
const listContact = document.getElementById('listContact');

//carrega os contatos da api
const loadContacts = async () => {
    const response = await fetch('http://contacts-api.azurewebsites.net/api/contacts');
    const data = await response.json();
    window.state = {
        ...window.state,
        contacts: data,
        favs: _.chunk(data.filter(filterContacts), 10)
    }
}

function montaContato(contato) {
    //componente de div coment
    let btnComents = createComponents('button', 'src/images/more.svg', 'btn-coments', 'btn-coments' + contato.id)
    //componentes de div edit-exclude
    let btnfav = contato.isFavorite ? createComponents('button', 'src/images/favorite.svg', 'btn-fav', 'btn-fav' + contato.id) : createComponents('button', 'src/images/favorite_border.svg', 'btn-fav', 'btn-fav' + contato.id)

    let btnedit = createComponents('button', 'src/images/baseline-edit-24px.svg', 'btn-edit-exclude', 'btn-edit' + contato.id)
    let btnexc = createComponents('button', 'src/images/round-delete_outline-24px.svg', 'btn-edit-exclude', 'btn-exclude' + contato.id)
    //divs
    let imgAvatar = contato.info.avatar != null ? contato.info.avatar : 'src/images/avatar-images.jpg'
    let divImg = createDivs('div-img', createComponents('img', imgAvatar))
    let divNome = createDivs('div-name', createComponents('h3', contato.firstName + " " + contato.lastName),
        createComponents('p', 'Email: ' + contato.email), createComponents('p', 'Endereço: ' + contato.info.address),
        createComponents('p', 'Telefone: ' + contato.info.phone))
    let divComents = createDivs('coments', createComponents('p', 'Coments: '), btnComents)
    let divInfos = createDivs('div-right', createComponents('p', 'Genero: ' + contato.gender),
        createComponents('p', 'Empresa: ' + contato.info.company), divComents)
    let divEditExclude = createDivs('edit-exclude', btnfav, btnedit, btnexc)
    let divContacts = createDivs('contact', divImg, divNome, divInfos, divEditExclude)
    divContacts.setAttribute('data', contato.id)
    listContact.appendChild(divContacts)
    addHover(contato.id, contato.isFavorite)
    addEventDeletar(contato)
    addEventEditar(contato)
    addEventComments(contato)
}

//cria os componentes html 
function createComponents(element, conteudo, classe = 'undefined', id = 'undefined') {
    let elemento = document.createElement(element)
    if (classe != 'undefined') {
        elemento.classList.add(classe)
    }
    if (id != 'undefined') {
        elemento.setAttribute('id', id)
    }
    if (element == 'img') {
        elemento.src = conteudo
        return elemento
    }
    if (element == 'button') {
        let imgEx = document.createElement('img')
        imgEx.setAttribute('id', 'img-fav' + id.substr(7, id.length));
        imgEx.src = conteudo
        elemento.appendChild(imgEx)
        return elemento
    }
    elemento.textContent = conteudo
    return elemento
}

function createDivs(classe, ...args) {
    let arg = Array.from(args);
    let div = document.createElement('div')
    div.classList.add(classe)
    for (let i = 0; i < arg.length; i++) {
        div.appendChild(arg[i])
    }
    return div
}

//add hover aos botões de favoritos
function addHover(idContato, isFav) {
    let btnFav = document.getElementById('btn-fav' + idContato)
    let imgfav = document.getElementById('img-fav' + idContato)
    if (!isFav) {
        btnFav.onmouseover = () => {

            imgfav.src = 'src/images/favorite.svg'
        }
        btnFav.onmouseout = () => {
            imgfav.src = 'src/images/favorite_border.svg'
        }
    } else {
        btnFav.onmouseover = () => {
            imgfav.src = 'src/images/favorite_border.svg'
        }
        btnFav.onmouseout = () => {
            imgfav.src = 'src/images/favorite.svg'
        }
    }
}
//adiciona evento ao botão deletar
function addEventDeletar(contato) {

    let btnExclude = document.getElementById('btn-exclude' + contato.id);
    btnExclude.onclick = () => {
        confirm(`Deseja mesmo excluir ${contato.firstName} ${contato.lastName}?`);
    }
}
function addEventEditar(contato) {

    let modal = document.getElementById('modal-add-edit');
    let titulo = document.getElementById('new-title');
    let btnEdit = document.getElementById('btn-edit' + contato.id)
    btnEdit.onclick = () => {
        modal.style.display = 'block';
        titulo.textContent = 'Editar Contato';
        completeForm(contato);
    }
}
//adciona evento ao botão comentários que irá abrir a modal de comentários
function addEventComments(contato) {

    let modalComents = document.getElementById('modal-coment')
    let btnComents = document.getElementById('btn-coments' + contato.id)
    let spanComents = document.getElementsByClassName('close-coments')[0]
    let paragraph = document.getElementById('comment-description')
    btnComents.onclick = () => {
        paragraph.textContent = contato.info.comments
        modalComents.style.display = 'block'
    }
    spanComents.onclick = () => {
        modalComents.style.display = 'none'
    }

}

function completeForm(contato) {
    let firstNameInput = document.getElementById('firstName')
    let lastNameInput = document.getElementById('lastName')
    let emailInput = document.getElementById('email')
    let genFemInput = document.getElementById('cFem')
    let genMascInput = document.getElementById('cMasc')
    let empresaInput = document.getElementById('company')
    let enderecoInput = document.getElementById('address')
    let telefoneInput = document.getElementById('phone')
    let comentariosInput = document.getElementById('comment')
    firstNameInput.value = contato.firstName
    lastNameInput.value = contato.lastName
    emailInput.value = contato.email
    contato.gender == 'f' ? genFemInput.setAttribute('checked', 'yes') : genMascInput.setAttribute('checked', 'yes')
    empresaInput.value = contato.info.company
    enderecoInput.value = contato.info.address
    telefoneInput.value = contato.info.phone
    comentariosInput.value = contato.info.comments
}

function createArrayPages() {
    const { contacts, favs, search } = window.state
    let listContacts = localStorage.getItem('filter') === 'favorites' ? favs : _.chunk(contacts, 10)
    listContacts = search != '' ? _.chunk(searchContacts(), 10) : listContacts
    let arrayPages = []
    for (let i = 0; i < listContacts.length; i++) {
        arrayPages.push(i + 1)
    }
    window.state = {
        ...window.state,
        pages: _.chunk(arrayPages, 6)
    }
}

function montarPaginacao() {
    let lista = document.getElementsByTagName('ul')[0]
    let itens = document.getElementsByTagName('li')
    for (let i = 0; i < window.state.pages[window.state.currentArray].length; i++) {
        let item = createComponents('li', window.state.pages[window.state.currentArray][i], 'page', window.state.pages[window.state.currentArray][i])
        lista.insertBefore(item, itens[itens.length - 1])
        addEventPaginacao(window.state.pages[window.state.currentArray][i])
    }
}

//adciona evento a cada item de paginação criado removendo classe, removendo contatos, mudando a página e renderizando novamente
function addEventPaginacao(id) {
    let item = document.getElementById(id)
    item.onclick = () => {
        if (!isNullOrUndefined(document.getElementsByClassName('currentPage')[0])) {
            document.getElementById(window.state.currentPage).classList.remove('currentPage')
        }
        window.state = {
            ...window.state,
            currentPage: item.textContent
        }
        removeContactsList()
        render()
        document.getElementById(window.state.currentPage).classList.add('currentPage')
    }
}

function removeContactsList() {
    let contatos = document.getElementsByClassName('contact')
    for (let i = contatos.length - 1; i >= 0; i--) {
        contatos[i].remove();
    }
}

function removePageList() {
    let pages = document.getElementsByClassName('page')
    for (let i = pages.length - 1; i >= 0; i--) {
        pages[i].remove();
    }
}

function render() {

    const { contacts, favs, currentPage, search } = window.state
    let listContacts = localStorage.getItem('filter') === 'favorites' ? favs : _.chunk(contacts, 10)
    listContacts = search != '' ? _.chunk(searchContacts(), 10) : listContacts
   
    modifyFilterSelect()
    if (listContacts != null && listContacts.length != 0)  {
        for (let i = 0; i < listContacts[currentPage - 1].length; i++) {
            montaContato(listContacts[currentPage - 1][i])
        }
        createArrayPages()
        removePageList()
        montarPaginacao()
    }else{
        let notice = createComponents('p','Não encontrei nenhum contato com este nome!  ):','notice')
        let divNotice = createDivs('contact',notice)
        listContact.appendChild(divNotice)
    }
}

function filterContacts(obj) {
    return obj.isFavorite
}

loadContacts().then(() => {
    createArrayPages()
    montarPaginacao()
    render()
    searchContacts()
    console.log(window.state.contacts.length)

})

export { montarPaginacao, render, removeContactsList, removePageList, createArrayPages }