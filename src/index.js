/* eslint-disable func-style */
import './index.css';
import { listContact,  montaContato} from './js/contactsList.js'
import { createComponents, createDivs} from './js/view.js'
import { loadContacts } from './js/api.js'
import { searchContacts, modifyFilterSelect} from './js/filter.js'
import { createArrayPages, montarPaginacao, removePageList } from './js/pagination.js'
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

const render = () => {
    const { contacts, favs, currentPage, search } = window.state
    let listContacts = localStorage.getItem('filter') === 'favorites' ? favs : _.chunk(contacts, 10)
    listContacts = search != '' ? _.chunk(searchContacts(), 10) : listContacts
    modifyFilterSelect()
    if (listContacts != null && listContacts.length != 0) {
        for (let i = 0; i < listContacts[currentPage - 1].length; i++) {
            montaContato(listContacts[currentPage - 1][i])
        }
        createArrayPages()
        removePageList()
        montarPaginacao()
    } else {
        const notice = createComponents('p', 'Não encontrei nenhum contato com este nome!  ):', 'notice')
        const divNotice = createDivs('contact', notice)
        listContact.appendChild(divNotice)
    }
}


loadContacts().then(() => {
    render()
    searchContacts()
})

export { render, _ }