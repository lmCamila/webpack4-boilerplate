import { rideModel, loadContacts, sendUpdate, deleteContact, getContactUrl, sendNew } from './api.js'
import { searchContacts,filterContacts } from './filter.js'
import { completeForm, validateEmail, validateLength } from './form.js'
import { removeContactsList, imgFav, imgNotFav, addEventImg } from './contactsList.js'
import { uploadFile } from './upload.js'
import { verifySize } from './view.js';
import { _ } from '../index.js'

const modalDetalheContato = document.getElementById('detail-contact')
const avatarInput = document.getElementById('avatar')
const titulo = document.getElementById('new-title');
const modal = document.getElementById('modal-add-edit');
const btnNew = document.getElementById('btn-new');
const divShadow = document.getElementById('shadow')
const span = document.getElementsByClassName('close')[0];

//evento botão novo contato
btnNew.onclick = () => {
    modal.style.display = 'block';
    divShadow.style.display = 'block'
    titulo.innerHTML = 'Novo Contato';
    modal.setAttribute('data-modo', 'new')
    document.getElementById('form-new-edit').reset()
}
span.onclick = () => {
    modal.style.display = 'none';
    divShadow.style.display = 'none'
    document.getElementById('form-new-edit').reset()
    document.getElementById('id').value = ""
    avatarInput.dataset.url = null
}

//evento para verificar se foi enviado um arquivo e manda-lo para api externa
avatarInput.onchange = () => {
    uploadFile(avatarInput.files[0])
}

//botão enviar formulario de novo contato ou editar contato
const btnEnviar = document.getElementById('submit')
btnEnviar.onclick = () => {

    const id = document.getElementById('id').value
    const favorite = document.getElementById('isFavorite').checked
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const emailInput = document.getElementById('email')
    const genFemInput = document.getElementById('cFem').checked
    const companyInput = document.getElementById('company')
    const addressInput = document.getElementById('address')
    const phoneInput = document.getElementById('phone')
    const commentsInput = document.getElementById('comment').value
    const url = avatarInput.dataset.url

    const gen = genFemInput ? "f" : "m"
    let msgSuccess = " "

    if (!validateLength(firstNameInput.value, firstNameInput) ||
        !validateLength(lastNameInput.value, lastNameInput) ||
        !validateEmail(emailInput.value) ||
        !validateLength(companyInput.value, companyInput) ||
        !validateLength(addressInput.value, addressInput) ||
        !validateLength(phoneInput.value, phoneInput)) {
        return
    }
    //firstName lastName email telefone empresa endereco
    const body = rideModel(firstNameInput.value, lastNameInput.value, emailInput.value, gen, favorite,
        companyInput.value, url, addressInput.value, phoneInput.value,
        commentsInput)

    //verifica modo da modal e faz requisição
    if (modal.dataset.modo == 'new') {
     
        msgSuccess = "Contato cadastrado com sucesso"
        sendNew(body).then((res) => {
            if (res.status == 201) {
                alert(msgSuccess)
                loadContacts().then(() => {
                    verifySize()
                    searchContacts()
                })
                modal.style.display = 'none';
                divShadow.style.display = 'none'
            } else if (res.status == 400) {
                alert('Erro, não foi possivel concluir essa ação.')
                modal.style.display = 'none';
                divShadow.style.display = 'none'
            }
        })
    } else if (modal.dataset.modo == 'edit') {
        msgSuccess = "Contato alterado com sucesso"
        sendUpdate(body, id).then((res) => {
            if (res.status == 200) {
                getContactUrl(res.url).then((response) => {
                    const results = window.state.contacts.filter((c) => c.id == id)
                    const pos = window.state.contacts.indexOf(results[0])
                    window.state.contacts.splice(pos, 1, response)
                    removeContactsList()
                    verifySize()
                    alert(msgSuccess)
                    modal.style.display = 'none';
                    divShadow.style.display = 'none'
                })
            } else if (res.status == 400) {
                alert('Erro, não foi possivel concluir essa ação.')
                modal.style.display = 'none';
            divShadow.style.display = 'none'
            }
            
        })
    }

}

//adciona evento onclick para favoritar contato
const addEventUpdateFav = (contato, btnId) => {
    const btnFav = document.getElementById(btnId)
    const imgFavorite = document.getElementById(btnId).childNodes[0]
    btnFav.onclick = () => {
        let isFav = true
        let newSrc = ''
        let msgError = ''
        if (btnFav.dataset.fav == 'true') {
            isFav = false
            newSrc = imgNotFav
            msgError = 'Erro,contato não foi removido dos favoritos.'
        } else {
            isFav = true
            newSrc = imgFav
            msgError = 'Erro,contato não foi adicionado aos favoritos.'
        }
        const body = rideModel(contato.firstName, contato.lastName, contato.email, contato.gender, isFav,
            contato.info.company, contato.info.avatar, contato.info.address, contato.info.phone,
            contato.info.comments)

        sendUpdate(body, contato.id).then((res) => {
            if (res.status == 200) {
                imgFavorite.src = newSrc
                getContactUrl(res.url).then((response) => {
                    const results = window.state.contacts.filter((c) => c.id == contato.id)
                    const pos = window.state.contacts.indexOf(results[0])
                    window.state.contacts.splice(pos, 1, response)
                    window.state = {
                        ...window.state,
                        favs: _.chunk(window.state.contacts.filter(filterContacts), 10)
                    }
                    removeContactsList()
                    verifySize()
                })
            } else if (res.status == 400) {
                alert(msgError)
            }
        })
    }
}

//adiciona evento ao botão deletar 
const addEventDelete = (contato) => {
    const btnExclude = document.getElementById('btn-exclude' + contato.id);
    const id = contato.id

    btnExclude.onclick = () => {
        if (confirm(`Deseja mesmo excluir ${contato.firstName} ${contato.lastName}?`)) {
            deleteContact(contato.id).then((res) => {
                if (res.status == 200) {
                    window.state = {
                        ...window.state,
                        contacts: window.state.contacts.filter((c) => c.id !== id)
                    }
                    alert('Contato excluído com sucesso!')
                    verifySize()
                    divShadow.style.display = 'none'
                    modalDetalheContato.style.display = 'none'
                } else if (res.status == 400) {
                    alert('Erro, contato não excluído!')
                }
            })
        }
    }
}


//add hover aos botões de favoritos
const addEventFav = (contato, btnId) => {
    const btnFav = document.getElementById(btnId)
    const imgFavorite = document.getElementById('img-fav' + contato.id)
    if (btnFav.dataset.fav == 'false') {
        btnFav.onmouseover = () => {

            imgFavorite.src = imgFav
        }
        btnFav.onmouseout = () => {
            imgFavorite.src = imgNotFav
        }
    } else {
        btnFav.onmouseover = () => {
            imgFavorite.src = imgNotFav
        }
        btnFav.onmouseout = () => {
            imgFavorite.src = imgFav
        }
    }
}

//adiciona evento ao botão editar de cada contato
const addEventEdit = (contato) => {
    const btnEdit = document.getElementById('btn-edit' + contato.id)
    btnEdit.onclick = () => {
        modal.style.display = 'block';
        modalDetalheContato.style.display = "none"
        divShadow.style.display = 'block'
        modal.setAttribute('data-modo', 'edit')
        titulo.textContent = 'Editar Contato';
        completeForm(contato);
    }
}
//adciona evento ao botão comentários de cada contato 
const addEventComments = (contato) => {

    const modalComents = document.getElementById('modal-coment')
    const btnComents = document.getElementById('btn-coments' + contato.id)
    const spanComents = document.getElementsByClassName('close-coments')[0]
    const paragraph = document.getElementById('comment-description')
    btnComents.onclick = () => {
        paragraph.textContent = contato.info.comments
        modalComents.style.display = 'block'
        divShadow.style.display = 'block'
    }
    spanComents.onclick = () => {
        modalComents.style.display = 'none'
        divShadow.style.display = 'none'
    }

}

//adiciona evendo de abrir a modal quando clicado no nome de um contato
const addEventContact = (contato) => {

    const nameContact = document.getElementById('name' + contato.id)
    const spanContacts = document.getElementsByClassName('close-details')[0]

    nameContact.onclick = () => {
        modalDetalheContato.style.display = 'block'
        divShadow.style.display = 'block'

        const imgContact = document.getElementsByClassName('imgContact')[0]
        const nameContact = document.getElementById('nameContact')
        const emailContact = document.getElementById('emailContact')
        const telContact = document.getElementById('telContact')
        const addressContact = document.getElementById('addressContact')
        const genderContact = document.getElementById('genderContact')
        const empresaContact = document.getElementById('empresaContact')
        const commentsContact = document.getElementById('commentsContact')
        const btnExclude = document.getElementsByClassName('btn-exclude-details')[0]
        const btnEdit = document.getElementsByClassName('btn-edit-details')[0]
        const btnFav = document.getElementsByClassName('btn-fav-details')[0]
        imgContact.src = contato.info.avatar
        nameContact.textContent = contato.firstName + " " + contato.lastName
        emailContact.textContent = 'Email: ' + contato.email
        telContact.textContent = 'Telefone: ' + contato.info.phone
        addressContact.textContent = 'Endereço: ' + contato.info.address
        genderContact.textContent = 'Genero: ' + contato.gender
        empresaContact.textContent = 'Empresa: ' + contato.info.company
        commentsContact.textContent = 'Comentários: ' + contato.info.comments
        btnExclude.setAttribute('id', 'btn-exclude' + contato.id)
        btnEdit.setAttribute('id', 'btn-edit' + contato.id)
        btnFav.setAttribute('id', 'btn-fav' + contato.id + 'modal')
        btnFav.setAttribute('data-fav', contato.isFavorite)
        imgContact.setAttribute('id', 'img' + contato.id)
        const imBtnFav = document.getElementById('btn-fav' + contato.id + 'modal').childNodes[0]
        contato.isFavorite ? imBtnFav.src = imgFav : imBtnFav.src = imgNotFav
        addEventFav(contato, 'btn-fav' + contato.id + 'modal')
        addEventDelete(contato)
        addEventEdit(contato)
        addEventUpdateFav(contato, 'btn-fav' + contato.id + 'modal')
        addEventImg(contato)
    }
    spanContacts.onclick = () => {
        modalDetalheContato.style.display = 'none'
        divShadow.style.display = 'none'
    }
}

export { addEventComments, addEventDelete, addEventEdit, addEventFav, addEventUpdateFav, addEventContact }