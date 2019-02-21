import { removeContactsList} from './contactsList.js'
import{ createArrayPages } from './pagination.js'
import{ render } from '../index.js'
const select = document.getElementsByTagName('select')[0]
select.onclick = () => {
    if (select.selectedIndex == 0) {
        window.localStorage.setItem('filter', select.options[select.selectedIndex].value)
        removeContactsList()
        createArrayPages()
        render()
    } else if (select.selectedIndex == 1) {
        window.localStorage.setItem('filter', select.options[select.selectedIndex].value)
        removeContactsList()
        createArrayPages()
        render()
    }
}

const modifyFilterSelect = () => {
    const option = localStorage.getItem('filter')
    const options = document.getElementsByTagName('option')
    if (option === 'none') {
        options[0].setAttribute('selected', 'selected')
    } else if (option === 'favorites') {
        options[1].setAttribute('selected', 'selected')
    }
}

const searchContacts = () => {
    const { contacts, search } = window.state
    let searchFilter = search
    searchFilter = searchFilter.replace(new RegExp('(ã|á|à|Ã|À|Á)', 'gi'), 'a')
    searchFilter = searchFilter.replace(new RegExp('(é|è|É|È)', 'gi'), 'e')
    searchFilter = searchFilter.replace(new RegExp('(í|ì|Í|Ì)', 'gi'), 'i')
    searchFilter = searchFilter.replace(new RegExp('(ó|ò|õ|Ò|Ó|Õ)', 'gi'), 'o')
    searchFilter = searchFilter.replace(new RegExp('(ú|ù|Ú|Ù)', 'gi'), 'u')
    searchFilter = searchFilter.replace(new RegExp('(ç|Ç)', 'gi'), 'c')
    const patern = `^${searchFilter}.*`
    const contactsMatch = contacts.filter(c => new RegExp(patern, 'gi').test(c.firstName));

    return contactsMatch
}

const search = document.getElementById('search')
search.onkeyup = ({ target: { value } }) => {
    window.state = {
        ...window.state,
        search: value
    }

    removeContactsList()
    render()

}

const filterContacts = (obj) => obj.isFavorite;

export{ searchContacts, filterContacts, modifyFilterSelect}