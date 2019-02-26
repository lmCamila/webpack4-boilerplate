import { createComponents, createDivs} from './view.js'
import {addEventComments, addEventDelete, addEventEdit, addEventFav, addEventUpdateFav, addEventContact} from './eventButton.js'

//imagens
const imgMore = require('../images/more.svg')
const imgFav = require('../images/favorite.svg')
const imgNotFav = require('../images/favorite_border.svg')
const imgEdit = require('../images/baseline-edit-24px.svg')
const imgExclude = require('../images/round-delete_outline-24px.svg')
const imgAvatarDefault = require('../images/avatar-default.jpg')

const listContact = document.getElementById('listContact')
//cria o contato no DOM e adciona os eventos 
const makeContact = (contact) => {
    //componente de div coment
    const btnComents = createComponents('button', imgMore, 'btn-coments', 'btn-coments' + contact.id)
    //componentes de div edit-exclude
    const btnFav = contact.isFavorite ? createComponents('button', imgFav, 'btn-fav', 'btn-fav' + contact.id) : createComponents('button', imgNotFav, 'btn-fav', 'btn-fav' + contact.id)
    btnFav.setAttribute('data-fav', contact.isFavorite)
    const btnedit = createComponents('button', imgEdit, 'btn-edit-exclude', 'btn-edit' + contact.id)
    const btnexc = createComponents('button',imgExclude, 'btn-edit-exclude', 'btn-exclude' + contact.id)
    //divs
    const imgAvatar =  createComponents('img', contact.info.avatar,'imgAvatar','img'+contact.id )
    const divImg = createDivs('div-img', imgAvatar)
    const divNome = createDivs('div-name', createComponents('h3', contact.firstName + " " + contact.lastName),
        createComponents('p', 'Email: ' + contact.email), createComponents('p', 'Endereço: ' + contact.info.address),
        createComponents('p', 'Telefone: ' + contact.info.phone))
    const divComents = createDivs('coments', createComponents('p', 'Coments: '), btnComents)
    const divInfos = createDivs('div-right', createComponents('p', 'Genero: ' + contact.gender),
        createComponents('p', 'Empresa: ' + contact.info.company), divComents)
    const divEditExclude = createDivs('edit-exclude', btnFav, btnedit, btnexc)
    const divContacts = createDivs('contact', divImg, divNome, divInfos, divEditExclude)
    divContacts.setAttribute('data-id', contact.id)
    listContact.appendChild(divContacts)
    addEventFav(contact,'btn-fav' + contact.id)
    addEventDelete(contact)
    addEventEdit(contact)
    addEventComments(contact)
    addEventUpdateFav(contact, 'btn-fav' + contact.id)
    addEventImg(contact)
}

//remove todos contatos da página
const removeContactsList = () => {
    const contact = document.getElementsByClassName('contact')
    const contactRes = document.getElementsByClassName('contact-responsive')
    const contacts = contact.length == 0 ? contactRes : contact
    for (let i = contacts.length - 1; i >= 0; i--) {
        contacts[i].remove();
    }
}

//cria label para contatos contendo somente os nomes
const makeResponsiveContact = (contact)=>{
    const name = createComponents('h3', contact.firstName + " " + contact.lastName,'name','name'+contact.id)
    const btnFav = contact.isFavorite ? createComponents('button', imgFav, 'btn-fav', 'btn-fav' + contact.id) : createComponents('button', imgNotFav, 'btn-fav', 'btn-fav' + contact.id)
    btnFav.setAttribute('data-fav', contact.isFavorite)
     const divfav = createDivs('fav',btnFav)
    const divContacts = createDivs('contact-responsive',name,divfav)
    divContacts.setAttribute('id', contact.id)
    listContact.appendChild(divContacts)
    addEventContact(contact)
    addEventFav(contact,'btn-fav' + contact.id)
    addEventUpdateFav(contact,'btn-fav' + contact.id)
}
//caso ocorra um erro ao carregar uma img carregará uma default
const addEventImg = (contact) =>{
    const img = document.getElementById('img'+contact.id )
    img.onerror = () =>{
        img.src = imgAvatarDefault
    }
    
}
export{ removeContactsList, listContact,  makeContact, makeResponsiveContact, addEventImg, imgFav, imgNotFav}