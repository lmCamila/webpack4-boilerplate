import { isNullOrUndefined } from 'util';
import{ render , _ } from '../index.js'
import{ searchContacts } from './filter.js'
import{ createComponents } from './view.js'
import{ removeContactsList } from './contactsList.js'
const createArrayPages = () => {
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

const removePageList = () => {
    const pages = document.getElementsByClassName('page')
    for (let i = pages.length - 1; i >= 0; i--) {
        pages[i].remove();
    }
}


//adciona evento a cada item de paginação criado removendo classe, removendo contatos, mudando a página e renderizando novamente
const addEventPaginacao = (id) => {
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

const btnBack = document.getElementById('back')
const btnForward = document.getElementById('forward')

btnBack.onclick = () => {
    if (!isNullOrUndefined(document.getElementsByClassName('currentPage')[0])) {
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

    const control = (window.state.currentPage % 6)

    if (control > 0) {
        removeContactsList()
        render()
    } else if (control == 0) {
        const array = window.state.currentArray - 1
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
        document.getElementById(window.state.currentPage).classList.remove('currentPage')
    }

    let page = parseInt(window.state.currentPage) + 1
    if (page > _.chunk(window.state.contacts, 10).length) {
        page = _.chunk(window.state.contacts, 10).length
    }

    window.state = {
        ...window.state,
        currentPage: page
    }

    const control = calculateControl()

    if (control <= 1) {
        removeContactsList()
        render()
    } else if (control > 1) {


        const array = window.state.currentArray + 1


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

const calculateControl = () => {
    let array = 1;
    if (window.state.currentArray > 0) {
        array = window.state.currentArray + 1
    }
    return (window.state.currentPage / array) / 6
}
export{ createArrayPages, montarPaginacao, removePageList }