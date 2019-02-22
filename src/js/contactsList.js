import { createComponents, createDivs} from './view.js'
import {addEventComments, addEventDeletar, addEventEditar, addEventFav, addEventUpdateFav} from './eventButton.js'
import { isNullOrUndefined } from 'util';
const listContact = document.getElementById('listContact')
//cria o contato no DOM e adciona os eventos 
const montaContato = (contato) => {
    //componente de div coment
    const btnComents = createComponents('button', 'src/images/more.svg', 'btn-coments', 'btn-coments' + contato.id)
    //componentes de div edit-exclude
    const btnfav = contato.isFavorite ? createComponents('button', 'src/images/favorite.svg', 'btn-fav', 'btn-fav' + contato.id) : createComponents('button', 'src/images/favorite_border.svg', 'btn-fav', 'btn-fav' + contato.id)
    btnfav.setAttribute('data-fav', contato.isFavorite)
    const btnedit = createComponents('button', 'src/images/baseline-edit-24px.svg', 'btn-edit-exclude', 'btn-edit' + contato.id)
    const btnexc = createComponents('button', 'src/images/round-delete_outline-24px.svg', 'btn-edit-exclude', 'btn-exclude' + contato.id)
    //divs
    const imgAvatar = !isNullOrUndefined(contato.info.avatar) ? contato.info.avatar : 'src/images/avatar-images.jpg'
    const divImg = createDivs('div-img', createComponents('img', imgAvatar))
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
}

//remove todos contatos da página
const removeContactsList = () => {
    const contatos = document.getElementsByClassName('contact')
    for (let i = contatos.length - 1; i >= 0; i--) {
        contatos[i].remove();
    }
}

export{ removeContactsList, listContact,  montaContato}