import { _ } from '../index.js'
import{ filterContacts } from './filter.js'

//carrega os contatos da api
const loadContacts = async () => {
    const response = await fetch('http://contacts-api.azurewebsites.net/api/contacts');
    const data = await response.json();
    window.state = {
        ...window.state,
        contacts: data.sort((a, b) => {
            if (a.firstName > b.firstName) {
                return 1
            }
            if (a.firstName < b.firstName) {
                return -1
            }
            return 0
        }),
        favs: _.chunk(data.filter(filterContacts), 10)
    }
}

const rideModel = (firstName,lastName,email,gender,favorite,company,avatar,address,phone,comments = null)=>{
    const model = {
        "firstName": firstName,
        "lastName":lastName,
        "email":email,
        "gender": gender,
        "isFavorite": favorite,
        "company":company,
        "avatar": avatar,
        "address": address,
        "phone": phone,
        "comments":comments
    }
    return JSON.stringify(model)
} 
const sendUpdate = async (body,id) => {
    const fetchConf = {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: body
    }
    const response = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${id}`, fetchConf)
    return response
}

const deleteContact = async (id) => {
    const fetchConf = {
        method: 'DELETE'
    }
    const response = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${id}`, fetchConf)
    return response
}

const getContactUrl = async (url)=>{
    const responceUp = await fetch(url)
    return await responceUp.json()
}
export{ loadContacts , rideModel, sendUpdate, deleteContact, getContactUrl}