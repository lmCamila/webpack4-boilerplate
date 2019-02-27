/* eslint-disable func-style */
import './index.css';
import { listContact,  makeContact, makeResponsiveContact} from './js/contactsList.js'
import { createComponents, createDivs, verifySize, verifyLoader} from './js/view.js'
import { loadContacts } from './js/api.js'
import { searchContacts, modifyFilterSelect} from './js/filter.js'
import { createArrayPages, makePaging, removePageList } from './js/pagination.js'
const _ = require('lodash/array')

window.state = {
    pages: [],
    currentPage: 1,
    currentArray: 0,
    contacts: [],
    favs: [],
    search: '',
    filter: '',
    loading:true
}

verifyLoader();

const render = (makeResponsive) => {
    const { contacts, favs, currentPage, search } = window.state
    let listContacts = localStorage.getItem('filter') == 'true' ? favs : _.chunk(contacts, 10)
    listContacts = search != '' ? _.chunk(searchContacts(), 10) : listContacts
    modifyFilterSelect()
    if (listContacts != null && listContacts.length != 0) {
        for (let i = 0; i < listContacts[currentPage - 1].length; i++) {
           if(makeResponsive == true){
            makeResponsiveContact(listContacts[currentPage - 1][i])
           }else{
            makeContact(listContacts[currentPage - 1][i])
           }
        }
        createArrayPages()
        removePageList()
        makePaging()
    } else {
        const notice = createComponents('p', 'Não encontrei nenhum contato com este nome!  ):', 'notice')
        const divNotice = createDivs('contact', notice)
        listContact.appendChild(divNotice)
    }
}

loadContacts().then(() => {
    
    verifySize()
    searchContacts()
})

export { render, _ }