/* eslint-disable func-style */
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
        contacts: data.sort((a,b)=>{
            if(a.firstName > b.firstName){
                return 1
            }
            if(a.firstName < b.firstName){
                return -1
            }
            return 0
        }),
        favs: _.chunk(data.filter(filterContacts), 10)
    }
}

const montaContato =(contato)=> {
    //componente de div coment
    const btnComents = createComponents('button', 'src/images/more.svg', 'btn-coments', 'btn-coments' + contato.id)
    //componentes de div edit-exclude
    const btnfav = contato.isFavorite ? createComponents('button', 'src/images/favorite.svg', 'btn-fav', 'btn-fav' + contato.id) : createComponents('button', 'src/images/favorite_border.svg', 'btn-fav', 'btn-fav' + contato.id)

    const btnedit = createComponents('button', 'src/images/baseline-edit-24px.svg', 'btn-edit-exclude', 'btn-edit' + contato.id)
    const btnexc = createComponents('button', 'src/images/round-delete_outline-24px.svg', 'btn-edit-exclude', 'btn-exclude' + contato.id)
    //divs
    const imgAvatar = contato.info.avatar != null ? contato.info.avatar : 'src/images/avatar-images.jpg'
    const divImg = createDivs('div-img', createComponents('img', imgAvatar))
    const divNome = createDivs('div-name', createComponents('h3', contato.firstName + " " + contato.lastName),
        createComponents('p', 'Email: ' + contato.email), createComponents('p', 'Endereço: ' + contato.info.address),
        createComponents('p', 'Telefone: ' + contato.info.phone))
    const divComents = createDivs('coments', createComponents('p', 'Coments: '), btnComents)
    const divInfos = createDivs('div-right', createComponents('p', 'Genero: ' + contato.gender),
        createComponents('p', 'Empresa: ' + contato.info.company), divComents)
    const divEditExclude = createDivs('edit-exclude', btnfav, btnedit, btnexc)
    const divContacts = createDivs('contact', divImg, divNome, divInfos, divEditExclude)
    divContacts.setAttribute('data', contato.id)
    listContact.appendChild(divContacts)
    addHover(contato.id, contato.isFavorite)
    addEventDeletar(contato)
    addEventEditar(contato)
    addEventComments(contato)
}

//cria os componentes html 
const createComponents = (element, conteudo, classe = 'undefined', id = 'undefined')=> {
    const elemento = document.createElement(element)
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
        const imgEx = document.createElement('img')
        imgEx.setAttribute('id', 'img-fav' + id.substr(7, id.length));
        imgEx.src = conteudo
        elemento.appendChild(imgEx)
        return elemento
    }
    elemento.textContent = conteudo
    return elemento
}

function createDivs(classe, ...args) {
    const arg = Array.from(args);
    const div = document.createElement('div')
    div.classList.add(classe)
    for (let i = 0; i < arg.length; i++) {
        div.appendChild(arg[i])
    }
    return div
}

//add hover aos botões de favoritos
function addHover(idContato, isFav) {
    const btnFav = document.getElementById('btn-fav' + idContato)
    const imgfav = document.getElementById('img-fav' + idContato)
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

    const btnExclude = document.getElementById('btn-exclude' + contato.id);
    btnExclude.onclick = () => {
        confirm(`Deseja mesmo excluir ${contato.firstName} ${contato.lastName}?`);
    }
}
const addEventEditar=(contato)=> {

    const modal = document.getElementById('modal-add-edit');
    const titulo = document.getElementById('new-title');
    const btnEdit = document.getElementById('btn-edit' + contato.id)
    btnEdit.onclick = () => {
        modal.style.display = 'block';
        titulo.textContent = 'Editar Contato';
        completeForm(contato);
    }
}
//adciona evento ao botão comentários que irá abrir a modal de comentários
const addEventComments=(contato)=> {

    const modalComents = document.getElementById('modal-coment')
    const btnComents = document.getElementById('btn-coments' + contato.id)
    const spanComents = document.getElementsByClassName('close-coments')[0]
    const paragraph = document.getElementById('comment-description')
    btnComents.onclick = () => {
        paragraph.textContent = contato.info.comments
        modalComents.style.display = 'block'
    }
    spanComents.onclick = () => {
        modalComents.style.display = 'none'
    }

}

const completeForm=(contato)=> {
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const emailInput = document.getElementById('email')
    const genFemInput = document.getElementById('cFem')
    const genMascInput = document.getElementById('cMasc')
    const empresaInput = document.getElementById('company')
    const enderecoInput = document.getElementById('address')
    const telefoneInput = document.getElementById('phone')
    const comentariosInput = document.getElementById('comment')
    firstNameInput.value = contato.firstName
    lastNameInput.value = contato.lastName
    emailInput.value = contato.email
    contato.gender == 'f' ? genFemInput.setAttribute('checked', 'yes') : genMascInput.setAttribute('checked', 'yes')
    empresaInput.value = contato.info.company
    enderecoInput.value = contato.info.address
    telefoneInput.value = contato.info.phone
    comentariosInput.value = contato.info.comments
}

const createArrayPages=() =>{
    const { contacts, favs, search } = window.state
    let listContacts = localStorage.getItem('filter') === 'favorites' ? favs : _.chunk(contacts, 10)
    listContacts = search != '' ? _.chunk(searchContacts(), 10) : listContacts
    const arrayPages = []
    for (let i = 0; i < listContacts.length; i++) {
        arrayPages.push(i + 1)
    }
    window.state = {
        ...window.state,
        pages: _.chunk(arrayPages, 6)
    }
}

const montarPaginacao = () => {
    const lista = document.getElementsByTagName('ul')[0]
    const itens = document.getElementsByTagName('li')
    for (let i = 0; i < window.state.pages[window.state.currentArray].length; i++) {
        const item = createComponents('li', window.state.pages[window.state.currentArray][i], 'page', window.state.pages[window.state.currentArray][i])
        lista.insertBefore(item, itens[itens.length - 1])
        addEventPaginacao(window.state.pages[window.state.currentArray][i])
    }
}

//adciona evento a cada item de paginação criado removendo classe, removendo contatos, mudando a página e renderizando novamente
const addEventPaginacao=(id)=> {
    const item = document.getElementById(id)
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

const removeContactsList=()=> {
    const contatos = document.getElementsByClassName('contact')
    for (let i = contatos.length - 1; i >= 0; i--) {
        contatos[i].remove();
    }
}

const removePageList=()=> {
    const pages = document.getElementsByClassName('page')
    for (let i = pages.length - 1; i >= 0; i--) {
        pages[i].remove();
    }
}

const render=()=>{
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
        const notice = createComponents('p','Não encontrei nenhum contato com este nome!  ):','notice')
        const divNotice = createDivs('contact',notice)
        listContact.appendChild(divNotice)
    }
}

const filterContacts = (obj) =>{return obj.isFavorite;}


loadContacts().then(() => {
    createArrayPages()
    montarPaginacao()
    render()
    searchContacts()
})

export { montarPaginacao, render, removeContactsList, removePageList, createArrayPages, _ }