import { removeContactsList } from "./contactsList";
import { render } from "..";

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
//cria as divs
const createDivs = (classe, ...args) => {
    const arg = Array.from(args);
    const div = document.createElement('div')
    div.classList.add(classe)
    for (let i = 0; i < arg.length; i++) {
        div.appendChild(arg[i])
    }
    return div
}
//verifica o tamanho da tela e troca a maneira de renderizar os componentes
const verifySize = () => {
    const widthList = window.innerWidth
    if (widthList < 890) {
        removeContactsList()
        render(true)
    } else {
        removeContactsList()
        render()
    }
}

window.addEventListener('resize', () => {
    verifySize()
})


const verifyLoader = () => {
    const loader = document.getElementsByClassName('loader')[0]
    const { loading } = window.state
    if (loading == true) {
        loader.style.display = 'block'
    } else {
        loader.style.display = 'none'
    }
}


export { createDivs, createComponents, verifySize, verifyLoader }