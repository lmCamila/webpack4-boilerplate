import { render } from '../index.js'
import { rideModel, sendUpdate, deleteContact, getContactUrl} from './api.js'
import{ completeForm } from './view.js'
import{ removeContactsList } from './contactsList.js'
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

//botão enviar formulario
const btnEnviar = document.getElementById('submit')
btnEnviar.onclick = () => {
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
        //method = "POST"
        //urlFetch = "http://contacts-api.azurewebsites.net/api/contacts"
        msgSuccess = "Contato cadastrado com sucesso"
    } else {
        msgSuccess = "Contato alterado com sucesso"
    }
    const body = rideModel(firstNameInput, lastNameInput, emailInput, gen, favorite,
        empresaInput, avatarInput.dataset.url, enderecoInput, telefoneInput,
        comentariosInput)
    sendUpdate(body,id).then((res) => {
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
    form.onsubmit = submit

}

//adciona evento onclick para favoritar contato(local e api)
const addEventUpdateFav = contato =>{
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
            contato.info.company, contato.info.avatar,contato.info.address,contato.info.phone,
            contato.info.comments)
        
        sendUpdate(body,contato.id).then((res) => {
            if (res.status == 200) {
                imgfav.src = newSrc
                getContactUrl(res.url).then((response)=>{
                    const results = window.state.contacts.filter((c) => c.id == contato.id)
                    const pos = window.state.contacts.indexOf(results[0])
                    window.state.contacts.splice(pos, 1,response)
                    removeContactsList()
                    render()
                })
            } else if (res.status == 400) {
                alert(msgError)
            }
        })
    }   
}

//adiciona evento ao botão deletar (local e api)
const addEventDeletar = (contato)=>{
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
const addEventFav = (contato)=>{
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


const addEventEditar = (contato) => {

    const modal = document.getElementById('modal-add-edit');
    const titulo = document.getElementById('new-title');
    const btnEdit = document.getElementById('btn-edit' + contato.id)
    btnEdit.onclick = () => {
        modal.style.display = 'block';
        titulo.textContent = 'Editar Contato';
        completeForm(contato);
    }
}
//adciona evento ao botão comentários que irá abrir a modal de comentários
const addEventComments = (contato) => {

    const modalComents = document.getElementById('modal-coment')
    const btnComents = document.getElementById('btn-coments' + contato.id)
    const spanComents = document.getElementsByClassName('close-coments')[0]
    const paragraph = document.getElementById('comment-description')
    btnComents.onclick = () => {
        paragraph.textContent = contato.info.comments
        modalComents.style.display = 'block'
    }
    spanComents.onclick = () => {
        modalComents.style.display = 'none'
    }

}

export{ addEventComments, addEventDeletar, addEventEditar, addEventFav, addEventUpdateFav}