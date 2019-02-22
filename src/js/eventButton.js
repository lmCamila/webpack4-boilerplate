import { render } from '../index.js'
import { rideModel, loadContacts, sendUpdate, deleteContact, getContactUrl, sendNew } from './api.js'
import { searchContacts } from './filter.js'
import { completeForm, validateForm } from './form.js'
import { removeContactsList } from './contactsList.js'
import { uploadFile } from './upload.js'

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
btnEnviar.onclick = (event) => {

    const id = document.getElementById('id').value
    const favorite = document.getElementById('isFavorite').checked
    const firstNameInput = document.getElementById('firstName').value
    const lastNameInput = document.getElementById('lastName').value
    const emailInput = document.getElementById('email').value
    const genFemInput = document.getElementById('cFem').checked
    const empresaInput = document.getElementById('company').value
    const enderecoInput = document.getElementById('address').value
    const telefoneInput = document.getElementById('phone').value
    const comentariosInput = document.getElementById('comment').value
    const url = avatarInput.dataset.url

    if (validateForm(event)) {
        const gen = genFemInput ? "f" : "m"
        let msgSuccess = " "

        const body = rideModel(firstNameInput, lastNameInput, emailInput, gen, favorite,
            empresaInput, url, enderecoInput, telefoneInput,
            comentariosInput)
        //verifica modo da modal 
        if (modal.dataset.modo == 'new') {
            msgSuccess = "Contato cadastrado com sucesso"
            sendNew(body).then((res) => {
                if (res == 200) {
                    alert(msgSuccess)
                    loadContacts().then(() => {
                        render()
                        searchContacts()
                    })
                } else if (res == 400) {
                    alert('Erro, não foi possivel concluir essa ação.')
                }
            })
        } else if (modal.dataset.modo == 'edit') {
            msgSuccess = "Contato alterado com sucesso"
            sendUpdate(body, id).then((res) => {
                if (res == 200) {
                    getContactUrl(res.url).then((response) => {
                        const results = window.state.contacts.filter((c) => c.id == id)
                        const pos = window.state.contacts.indexOf(results[0])
                        window.state.contacts.splice(pos, 1, response)
                        removeContactsList()
                        render()
                        alert(msgSuccess)
                    })
                } else if (res == 400) {
                    alert('Erro, não foi possivel concluir essa ação.')
                }
            })
        }
        modal.style.display = 'none';
        divShadow.style.display = 'none'
    }
}

//adciona evento onclick para favoritar contato
const addEventUpdateFav = contato => {
    const btnFav = document.getElementById('btn-fav' + contato.id)
    const imgfav = document.getElementById('img-fav' + contato.id)
    btnFav.onclick = () => {
        let isFav = true
        let newSrc = ''
        let msgError = ''
        if (btnFav.dataset.fav == 'true') {
            isFav = false
            newSrc = 'src/images/favorite_border.svg'
            msgError = 'Erro,contato não foi removido dos favoritos.'
        } else {
            isFav = true
            newSrc = 'src/images/favorite.svg'
            msgError = 'Erro,contato não foi adicionado aos favoritos.'
        }
        const body = rideModel(contato.firstName, contato.lastName, contato.email, contato.gender, isFav,
            contato.info.company, contato.info.avatar, contato.info.address, contato.info.phone,
            contato.info.comments)

        sendUpdate(body, contato.id).then((res) => {
            if (res.status == 200) {
                imgfav.src = newSrc
                getContactUrl(res.url).then((response) => {
                    const results = window.state.contacts.filter((c) => c.id == contato.id)
                    const pos = window.state.contacts.indexOf(results[0])
                    window.state.contacts.splice(pos, 1, response)
                    removeContactsList()
                    render()
                })
            } else if (res.status == 400) {
                alert(msgError)
            }
        })
    }
}

//adiciona evento ao botão deletar 
const addEventDeletar = (contato) => {
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
                    removeContactsList()
                    render()
                } else if (res.status == 400) {
                    alert('Erro, contato não excluído!')
                }
            })
        }
    }
}


//add hover aos botões de favoritos
const addEventFav = (contato) => {
    const btnFav = document.getElementById('btn-fav' + contato.id)
    const imgfav = document.getElementById('img-fav' + contato.id)
    if (btnFav.dataset.fav == 'false') {
        btnFav.onmouseover = () => {

            imgfav.src = 'src/images/favorite.svg'
        }
        btnFav.onmouseout = () => {
            imgfav.src = 'src/images/favorite_border.svg'
        }
    } else {
        btnFav.onmouseover = () => {
            imgfav.src = 'src/images/favorite_border.svg'
        }
        btnFav.onmouseout = () => {
            imgfav.src = 'src/images/favorite.svg'
        }
    }
}

//adiciona evento ao botão editar de cada contato
const addEventEditar = (contato) => {
    const btnEdit = document.getElementById('btn-edit' + contato.id)
    btnEdit.onclick = () => {
        modal.style.display = 'block';
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

export { addEventComments, addEventDeletar, addEventEditar, addEventFav, addEventUpdateFav }