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
firstNameInput.onkeyup = ({target: { value }})=>{
    if(value.length < 3){
        firstNameInput.style.backgroundColor = "#E15A5A"
        firstNameInput.style.border ="1px solid #FF0000"
        firstNameInput.focus
    }else{
        firstNameInput.style.backgroundColor = "#FFFFFF"
        firstNameInput.style.border = "none"
    }
}
lastNameInput.onkeyup = ({target: { value }})=>{
    if(value.length < 3){
        lastNameInput.style.backgroundColor = "#E15A5A"
        lastNameInput.style.border ="1px solid #FF0000"
        lastNameInput.focus
    }else{
        lastNameInput.style.backgroundColor = "#FFFFFF"
        lastNameInput.style.border = "none"
    }
}
emailInput.onkeyup = ({target: { value }})=>{
    if(value.length < 3){
        emailInput.style.backgroundColor = "#E15A5A"
        emailInput.style.border ="1px solid #FF0000"
        emailInput.focus
    }else{
        emailInput.style.backgroundColor = "#FFFFFF"
        emailInput.style.border = "none"
    }
}
empresaInput.onkeyup = ({target: { value }})=>{
    if(value.length < 3){
        empresaInput.style.backgroundColor = "#E15A5A"
        empresaInput.style.border ="1px solid #FF0000"
        empresaInput.focus
    }else{
        empresaInput.style.backgroundColor = "#FFFFFF"
        empresaInput.style.border = "none"
    }
}
enderecoInput.onkeyup = ({target: { value }})=>{
    if(value.length < 3){
        enderecoInput.style.backgroundColor = "#E15A5A"
        enderecoInput.style.border ="1px solid #FF0000"
        enderecoInput.focus
    }else{
        enderecoInput.style.backgroundColor = "#FFFFFF"
        enderecoInput.style.border = "none"
    }
}


//completa formulário de edição com as informações do contato
const completeForm = (contato) => {
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

export{ completeForm }