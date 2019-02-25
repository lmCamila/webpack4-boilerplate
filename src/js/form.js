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

//valida no momento da digitação os campos abaixo
firstNameInput.onkeyup = ({ target: { value } }) => {
    if (!validateLength(value, firstNameInput)) {
        return
    } else {
        firstNameInput.style.backgroundColor = "#FFFFFF"
        firstNameInput.style.border = "none"
    }
}

lastNameInput.onkeyup = ({ target: { value } }) => {
    if (!validateLength(value, lastNameInput)) {
        return
    } else {
        lastNameInput.style.backgroundColor = "#FFFFFF"
        lastNameInput.style.border = "none"
    }
}

emailInput.onkeyup = ({ target: { value } }) => {
    if (!validateEmail(value)) {
        return
    } else {
        emailInput.style.backgroundColor = "#FFFFFF"
        emailInput.style.border = "none"
    }
}

empresaInput.onkeyup = ({ target: { value } }) => {
    if (!validateLength(value, empresaInput)) {
        return
    } else {
        empresaInput.style.backgroundColor = "#FFFFFF"
        empresaInput.style.border = "none"
    }
}

enderecoInput.onkeyup = ({ target: { value } }) => {
    if (!validateLength(value, enderecoInput)) {
        return
    } else {
        enderecoInput.style.backgroundColor = "#FFFFFF"
        enderecoInput.style.border = "none"
    }
}

telefoneInput.onkeyup = ({ target: { value } }) => {
    console.log(value)
    if (!validateLength(value, telefoneInput)) {
        return
    } else {
        telefoneInput.style.backgroundColor = "#FFFFFF"
        telefoneInput.style.border = "none"
    }
}

//valida email
const validateEmail = value => {
    const patern = '^([\\w]\\.?_?)+@([\\w-]+\\.)+([A-Za-z]{2,4})+$'
    const teste = new RegExp(patern, 'gi').test(value)
    if (value.length < 3 || !teste) {
        emailInput.style.backgroundColor = "#E15A5A"
        emailInput.style.border = "1px solid #FF0000"
        emailInput.focus
        return false
    } else {
        return true
    }
}
//valida se a string recebida tem no minimo 3 caracteres
const validateLength = (value, input) => {
    if (value.length < 3) {
        input.style.backgroundColor = "#E15A5A"
        input.style.border = "1px solid #FF0000"
        input.focus
        return false
    } else {
        return true
    }
}

//completa formulário de edição com as informações do contato
const completeForm = (contato) => {
    id.value = contato.id
    contato.isFavorite ? favorite.checked = true : favorite.checked = false
    avatarInput.setAttribute('data-url', contato.info.avatar)
    firstNameInput.value = contato.firstName
    lastNameInput.value = contato.lastName
    emailInput.value = contato.email
    contato.gender == 'f' ? genFemInput.setAttribute('checked', 'yes') : genMascInput.setAttribute('checked', 'yes')
    empresaInput.value = contato.info.company
    enderecoInput.value = contato.info.address
    telefoneInput.value = contato.info.phone
    comentariosInput.value = contato.info.comments
}

export { completeForm, validateLength, validateEmail }