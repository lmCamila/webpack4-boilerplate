const completeForm = (contato) => {
    const id = document.getElementById('id')
    const favorite = document.getElementById('isFavorite')
    const avatarInput = document.getElementById('avatar')
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const emailInput = document.getElementById('email')
    const genFemInput = document.getElementById('cFem')
    const genMascInput = document.getElementById('cMasc')
    const empresaInput = document.getElementById('company')
    const enderecoInput = document.getElementById('address')
    const telefoneInput = document.getElementById('phone')
    const comentariosInput = document.getElementById('comment')
    id.value = contato.id
    contato.isFavorite ? favorite.checked = true : favorite.checked = false
    avatarInput.setAttribute('data-url',contato.info.avatar)
    firstNameInput.value = contato.firstName
    lastNameInput.value = contato.lastName
    emailInput.value = contato.email
    contato.gender == 'f' ? genFemInput.setAttribute('checked', 'yes') : genMascInput.setAttribute('checked', 'yes')
    empresaInput.value = contato.info.company
    enderecoInput.value = contato.info.address
    telefoneInput.value = contato.info.phone
    comentariosInput.value = contato.info.comments
}


//cria os componentes html 
const createComponents = (element, conteudo, classe = 'undefined', id = 'undefined') => {
    const elemento = document.createElement(element)
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
        const imgEx = document.createElement('img')
        imgEx.setAttribute('id', 'img-fav' + id.substr(7, id.length));
        imgEx.src = conteudo
        elemento.appendChild(imgEx)
        return elemento
    }
    elemento.textContent = conteudo
    return elemento
}

const createDivs = (classe, ...args) => {
    const arg = Array.from(args);
    const div = document.createElement('div')
    div.classList.add(classe)
    for (let i = 0; i < arg.length; i++) {
        div.appendChild(arg[i])
    }
    return div
}

export{ createDivs, createComponents, completeForm}