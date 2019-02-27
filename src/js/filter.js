import { removeContactsList } from './contactsList.js'
import { createArrayPages } from './pagination.js'
import { verifySize } from './view.js'
const select = document.getElementsByTagName('select')[0]

//renderiza os contatos e adciona ao localStorage a preferência de filtro
select.onclick = () => {
    if (select.selectedIndex == 0) {
        window.localStorage.setItem('filter', false)
        removeContactsList()
        createArrayPages()
        verifySize()
    } else if (select.selectedIndex == 1) {
        window.localStorage.setItem('filter', true)
        if (window.state.currentArray < parseInt(window.state.favs.length) +1 ) {
            window.state = {
                ...window.state,
                currentPage: 1,
                currentArray: 0
            }
        }
        
        removeContactsList()
        createArrayPages()
        verifySize()
    }
}

//modifica o valor da option do filtro para ficar de acordo com o localStorage
const modifyFilterSelect = () => {
    const option = localStorage.getItem('filter')
    const options = document.getElementsByTagName('option')
    if (option == 'false') {
        options[0].setAttribute('selected', 'selected')
    } else if (option == 'true') {
        options[1].setAttribute('selected', 'selected')
    }
}

//filtra os contatos aplicando regex e retorna um array
const searchContacts = () => {
    const { contacts, search } = window.state
    let searchFilter = search
    searchFilter = searchFilter.replace(new RegExp('(ã|á|à|Ã|À|Á)', 'gi'), 'a')
    searchFilter = searchFilter.replace(new RegExp('(é|è|É|È)', 'gi'), 'e')
    searchFilter = searchFilter.replace(new RegExp('(í|ì|Í|Ì)', 'gi'), 'i')
    searchFilter = searchFilter.replace(new RegExp('(ó|ò|õ|Ò|Ó|Õ)', 'gi'), 'o')
    searchFilter = searchFilter.replace(new RegExp('(ú|ù|Ú|Ù)', 'gi'), 'u')
    searchFilter = searchFilter.replace(new RegExp('(ç|Ç)', 'gi'), 'c')
    const patern = `^${searchFilter}`

    return contacts.filter(c => new RegExp(patern, 'gi').test(c.firstName));
}

//evento de digitação para fazer a busca assim que algo for digitado
const search = document.getElementById('search')
search.onkeyup = ({ target: { value } }) => {
    window.state = {
        ...window.state,
        search: value,
        currentPage: 1,
        currentArray: 0
    }

    removeContactsList()
    verifySize()

}
const searchDropdown = document.getElementById('search-dropdown')
searchDropdown.onkeyup = ({ target: { value } }) => {
    window.state = {
        ...window.state,
        search: value
    }

    removeContactsList()
    verifySize()

}
//retorna um array com os contatos favoritos
const filterContacts = (obj) => obj.isFavorite;

export { searchContacts, filterContacts, modifyFilterSelect }