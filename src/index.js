import './index.css';
import './js/view.js';

const listContact = document.getElementsByClassName('list');
console.log(listContact)
 async function loadContacts() {
    const response = await fetch('http://contacts-api.azurewebsites.net/api/contacts');
    return response.json();
}

loadContacts().then(res => console.log(res)).catch(err => console.log(err));

