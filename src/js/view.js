import { montarPaginacao, render, removeContactsList, removePageList, createArrayPages, _, rideModel } from '../index.js'
import { isNullOrUndefined } from 'util';
//botao novo
const titulo = document.getElementById('new-title');
const modal = document.getElementById('modal-add-edit');
const btnNew = document.getElementById('btn-new');
const span = document.getElementsByClassName('close')[0];
btnNew.onclick = () => {
    modal.style.display = 'block';
    titulo.innerHTML = 'Novo Contato';
    document.getElementById('form-new-edit').reset()
    document.getElementById('id').value = null
}
span.onclick = () => {
    modal.style.display = 'none';
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

const btnEnviar = document.getElementById('submit')
btnEnviar.onclick = () => {
    let method = " "
    let urlFetch = " "
    let msgSuccess = " "
    const form = document.getElementById('form-new-edit')
    const id = document.getElementById('id').value
    const favorite = document.getElementById('isFavorite').checked
    const avatarInput = document.getElementById('avatar')
    const firstNameInput = document.getElementById('firstName').value
    const lastNameInput = document.getElementById('lastName').value
    const emailInput = document.getElementById('email').value
    const genFemInput = document.getElementById('cFem').checked
    const empresaInput = document.getElementById('company').value
    const enderecoInput = document.getElementById('address').value
    const telefoneInput = document.getElementById('phone').value
    const comentariosInput = document.getElementById('comment').value
    let gen = " "
    genFemInput ? gen = "f" : gen = "m"
    if (isNullOrUndefined(id)) {
        method = "POST"
        urlFetch = "http://contacts-api.azurewebsites.net/api/contacts"
        msgSuccess = "Contato cadastrado com sucesso"
    } else {
        method = "PUT"
        urlFetch = `http://contacts-api.azurewebsites.net/api/contacts/${id}`
        msgSuccess = "Contato alterado com sucesso"
    }
    const fetchConf = {
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: rideModel(firstNameInput, lastNameInput, emailInput, gen, favorite,
            empresaInput, avatarInput.dataset.url, enderecoInput, telefoneInput,
            comentariosInput)
    }
    const send = async () => {
        const response = await fetch(urlFetch, fetchConf)
        return response
    }
    form.onsubmit = submit
    send().then((res) => {
        if (res == 200) {
            const updatedContact = async () => {
                const responceUp = await fetch(res.url)
                return await responceUp.json()
            }
            updatedContact().then((response) => {
                const results = window.state.contacts.filter((c) => c.id == id)
                const pos = window.state.contacts.indexOf(results[0])
                window.state.contacts.splice(pos, 1, response)
                removeContactsList()
                render()
                alert(msgSuccess)
            })
        }else if(res == 400){
            alert('Erro, não foi possivel concluir essa ação.')
        }
    })

}
export { modifyFilterSelect, searchContacts }



