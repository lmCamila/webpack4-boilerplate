import { createComponents, createDivs} from './view.js'
import {addEventComments, addEventDeletar, addEventEditar, addEventFav, addEventUpdateFav, addEventContact} from './eventButton.js'

//imagens
const imgMore = require('../images/more.svg')
const imgFav = require('../images/favorite.svg')
const imgNotFav = require('../images/favorite_border.svg')
const imgEdit = require('../images/baseline-edit-24px.svg')
const imgExclude = require('../images/round-delete_outline-24px.svg')
const imgAvatarDefault = require('../images/avatar-default.jpg')

const listContact = document.getElementById('listContact')
//cria o contato no DOM e adciona os eventos 
const montaContato = (contato) => {
    //componente de div coment
    const btnComents = createComponents('button', imgMore, 'btn-coments', 'btn-coments' + contato.id)
    //componentes de div edit-exclude
    const btnfav = contato.isFavorite ? createComponents('button', imgFav, 'btn-fav', 'btn-fav' + contato.id) : createComponents('button', imgNotFav, 'btn-fav', 'btn-fav' + contato.id)
    btnfav.setAttribute('data-fav', contato.isFavorite)
    const btnedit = createComponents('button', imgEdit, 'btn-edit-exclude', 'btn-edit' + contato.id)
    const btnexc = createComponents('button',imgExclude, 'btn-edit-exclude', 'btn-exclude' + contato.id)
    //divs
    const imgAvatar =  createComponents('img', contato.info.avatar,'imgAvatar','img'+contato.id )
    const divImg = createDivs('div-img', imgAvatar)
    const divNome = createDivs('div-name', createComponents('h3', contato.firstName + " " + contato.lastName),
        createComponents('p', 'Email: ' + contato.email), createComponents('p', 'Endereço: ' + contato.info.address),
        createComponents('p', 'Telefone: ' + contato.info.phone))
    const divComents = createDivs('coments', createComponents('p', 'Coments: '), btnComents)
    const divInfos = createDivs('div-right', createComponents('p', 'Genero: ' + contato.gender),
        createComponents('p', 'Empresa: ' + contato.info.company), divComents)
    const divEditExclude = createDivs('edit-exclude', btnfav, btnedit, btnexc)
    const divContacts = createDivs('contact', divImg, divNome, divInfos, divEditExclude)
    divContacts.setAttribute('data-id', contato.id)
    listContact.appendChild(divContacts)
    addEventFav(contato)
    addEventDeletar(contato)
    addEventEditar(contato)
    addEventComments(contato)
    addEventUpdateFav(contato)
    addEventImg(contato)
}

//remove todos contatos da página
const removeContactsList = () => {
    const contact = document.getElementsByClassName('contact')
    const contactRes = document.getElementsByClassName('contact-responsive')
    const contatos = contact.length == 0 ? contactRes : contact
    for (let i = contatos.length - 1; i >= 0; i--) {
        contatos[i].remove();
    }
}

//cria label para contatos contendo somente os nomes
const montarContatoResponsivo = (contato)=>{
    const name = createComponents('h3', contato.firstName + " " + contato.lastName,'name','name'+contato.id)
    const btnfav = contato.isFavorite ? createComponents('button', imgFav, 'btn-fav', 'btn-fav' + contato.id) : createComponents('button', imgNotFav, 'btn-fav', 'btn-fav' + contato.id)
    btnfav.setAttribute('data-fav', contato.isFavorite)
     const divfav = createDivs('fav',btnfav)
    const divContacts = createDivs('contact-responsive',name,divfav)
    divContacts.setAttribute('id', contato.id)
    listContact.appendChild(divContacts)
    addEventContact(contato)
    addEventFav(contato)
    addEventUpdateFav(contato)
}
//caso ocorra um erro ao carregar uma img carregará uma default
const addEventImg = (contato) =>{
    const img = document.getElementById('img'+contato.id )
    img.onerror = () =>{
        img.src = imgAvatarDefault
    }
    
}
export{ removeContactsList, listContact,  montaContato, montarContatoResponsivo,  imgFav, imgNotFav}