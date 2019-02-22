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

const validateForm = (event)=>{
    let countError = 0
    if(firstNameInput.value.lenght < 3){
        event.preventdefault();
        firstNameInput.style.backgroundColor = "#E15A5A"
        firstNameInput.style.border ="1px solid #FF0000"
        firstNameInput.focus
        countError++
    }
    if(lastNameInput.value.lenght < 3){
        event.preventdefault();
        lastNameInput.style.backgroundColor = "#E15A5A"
        lastNameInput.style.border ="1px solid #FF0000"
        lastNameInput.focus()
        countError++
    }
    if(emailInput.value.lenght < 3){
        event.preventdefault();
        lastNameInput.style.backgroundColor = "#E15A5A"
        lastNameInput.style.border ="1px solid #FF0000"
        lastNameInput.focus()
        countError++
    }
    if(empresaInput< 3){
        event.preventdefault();
        empresaInput.style.backgroundColor = "#E15A5A"
        empresaInput.style.border ="1px solid #FF0000"
        empresaInput.focus()
        countError++
    }
    if(enderecoInput< 3){
        event.preventdefault();
        enderecoInput.style.backgroundColor = "#E15A5A"
        enderecoInput.style.border ="1px solid #FF0000"
        enderecoInput.focus()
        countError++
    }
   if(countError == 0){
       return true
   }else{
       return false
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

export{ completeForm , validateForm}