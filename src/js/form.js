const id = document.getElementById('id')
const favorite = document.getElementById('isFavorite')
const avatarInput = document.getElementById('avatar')
const firstNameInput = document.getElementById('firstName')
const lastNameInput = document.getElementById('lastName')
const emailInput = document.getElementById('email')
const genFemInput = document.getElementById('cFem')
const genMascInput = document.getElementById('cMasc')
const companyInput = document.getElementById('company')
const addressInput = document.getElementById('address')
const phoneInput = document.getElementById('phone')
const commentsInput = document.getElementById('comment')

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

companyInput.onkeyup = ({ target: { value } }) => {
    if (!validateLength(value, companyInput)) {
        return
    } else {
        companyInput.style.backgroundColor = "#FFFFFF"
        companyInput.style.border = "none"
    }
}

addressInput.onkeyup = ({ target: { value } }) => {
    if (!validateLength(value, addressInput)) {
        return
    } else {
        addressInput.style.backgroundColor = "#FFFFFF"
        addressInput.style.border = "none"
    }
}

phoneInput.onkeyup = ({ target: { value } }) => {
    if (!validateLength(value, phoneInput)) {
        return
    } else {
        phoneInput.style.backgroundColor = "#FFFFFF"
        phoneInput.style.border = "none"
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
const completeForm = (contact) => {
    id.value = contact.id
    contact.isFavorite ? favorite.checked = true : favorite.checked = false
    avatarInput.setAttribute('data-url', contact.info.avatar)
    firstNameInput.value = contact.firstName
    lastNameInput.value = contact.lastName
    emailInput.value = contact.email
    contact.gender == 'f' ? genFemInput.setAttribute('checked', 'yes') : genMascInput.setAttribute('checked', 'yes')
    companyInput.value = contact.info.company
    addressInput.value = contact.info.address
    phoneInput.value = contact.info.phone
    commentsInput.value = contact.info.comments
}

export { completeForm, validateLength, validateEmail }