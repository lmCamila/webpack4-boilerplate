import './index.css';
import './js/view.js';

const listContact = document.getElementById('listContact');
console.log(listContact)
async function loadContacts() {
    const response = await fetch('http://contacts-api.azurewebsites.net/api/contacts');
    return response.json();
}

loadContacts().then(res => {
    for (let i = 0; i < 11; i++) {
        montaContato(res[i])
        addHover(res[i].id, res[i].isFavorite)
        addClick(res[i])
    }

}).catch(err => console.log(err));

function montaContato(contato) {
    //componente de div coment
    let btnComents = creatComponents('button', 'src/images/more.svg', 'btn-coments', 'btn-coments' + contato.id)
    //componentes de div edit-exclude
    let btnfav = contato.isFavorite ? creatComponents('button', 'src/images/favorite.svg', 'btn-fav', 'btn-fav' + contato.id) : creatComponents('button', 'src/images/favorite_border.svg', 'btn-fav', 'btn-fav' + contato.id)

    let btnedit = creatComponents('button', 'src/images/baseline-edit-24px.svg', 'btn-edit-exclude', 'btn-edit' + contato.id)
    let btnexc = creatComponents('button', 'src/images/round-delete_outline-24px.svg', 'btn-edit-exclude', 'btn-exclude' + contato.id)

    //divs
    let imgAvatar = contato.info.avatar != null ? contato.info.avatar : 'src/images/avatar-images.jpg'
    let divImg = createDivs('div-img', creatComponents('img',imgAvatar))
    let divNome = createDivs('div-name', creatComponents('h3', contato.firstName + " " + contato.lastName),
        creatComponents('p', 'Email: ' + contato.email), creatComponents('p', 'Endereço: ' + contato.info.address),
        creatComponents('p', 'Telefone: ' + contato.info.phone))
    let divComents = createDivs('coments', creatComponents('p', 'Coments: '), btnComents)
    let divInfos = createDivs('div-right', creatComponents('p', 'Genero: ' + contato.gender),
        creatComponents('p', 'Empresa: ' + contato.info.company), divComents)
    let divEditExclude = createDivs('edit-exclude', btnfav, btnedit, btnexc)
    let divContacts = createDivs('contact', divImg, divNome, divInfos, divEditExclude)
    divContacts.setAttribute('data', contato.id)
    listContact.appendChild(divContacts)
}

function creatComponents(element, conteudo, classe = 'undefined', id = 'undefined') {
    let elemento = document.createElement(element)
    if (classe != 'undefined') {
        elemento.classList.add(classe)
    }
    if (id != 'undefined') {
        elemento.setAttribute('id', id)
    }
    if (element == 'img') {
        elemento.src = conteudo
        return elemento
    }
    if (element == 'button') {
        let imgEx = document.createElement('img')
        imgEx.setAttribute('id', 'img-fav' + id.substr(7, id.length));
        imgEx.src = conteudo
        elemento.appendChild(imgEx)
        return elemento
    }
    elemento.textContent = conteudo
    return elemento
}

function createDivs(classe, ...args) {
    let arg = Array.from(args);
    let div = document.createElement('div')
    div.classList.add(classe)
    for (let i = 0; i < arg.length; i++) {
        div.appendChild(arg[i])
    }
    return div
}

function addHover(idContato, isFav) {
    let btnFav = document.getElementById('btn-fav' + idContato)
    let imgfav = document.getElementById('img-fav' + idContato)
    if (!isFav) {
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

function addClick(contato){
//deletar
let btnExclude = document.getElementById('btn-exclude'+contato.id);
btnExclude.onclick = ()=>{
    confirm(`Deseja mesmo excluir ${contato.firstName} ${contato.lastName}?`);
}
//editar
let modal = document.getElementById('modal-add-edit');
let titulo = document.getElementById('new-title');
let btnEdit = document.getElementById('btn-edit'+contato.id)
btnEdit.onclick = ()=>{
    modal.style.display = 'block';
    titulo.textContent = 'Editar Contato';
    completeForm(contato);
}
//favoritar
}

function completeForm(contato){
    let firstNameInput = document.getElementById('firstName')
    let lastNameInput = document.getElementById('lastName')
    let emailInput = document.getElementById('email')
    let genFemInput = document.getElementById('cFem')
    let genMascInput = document.getElementById('cMasc')
    let empresaInput = document.getElementById('company')
    let enderecoInput = document.getElementById('address')
    let telefoneInput = document.getElementById('phone')
    let comentariosInput = document.getElementById('comment')
    firstNameInput.value = contato.firstName
    lastNameInput.value = contato.lastName
    emailInput.value = contato.email
    contato.gender == 'f' ? genFemInput.setAttribute('checked','yes') : genMascInput.setAttribute('checked','yes')
    empresaInput.value = contato.info.company
    enderecoInput.value = contato.info.address
    telefoneInput.value = contato.info.phone
    comentariosInput.value = contato.info.comments
}