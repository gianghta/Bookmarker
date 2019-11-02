const addBtn = document.querySelector('#addBtn');
const clearAllBtn = document.querySelector('#clearBtn');
const ul = document.querySelector('.list-unstyled');

console.log('Loaded resource');

function addLink(tabs) {
    let url = tabs[0].url;
    let title = ` ${tabs[0].title}`;
    let iconUrl = tabs[0].favIconUrl;

    // List item
    const li = document.createElement('li');
    li.className = 'd-flex justify-content-between align-items-center';

    // Favicon
    const icon = document.createElement('img');
    icon.setAttribute('src', iconUrl);

    // Title
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    const titleNode = document.createTextNode(title);

    // Delete button
    const deleteBtn = document.createElement('a');
    deleteBtn.className = 'delete-item float-right fa fa-times';

    // Setting up and adding link to the list
    a.appendChild(icon);
    a.appendChild(titleNode);
    li.appendChild(a);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

function removeLink(e) {
    if (e.target.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove();
        }
    }
    console.log('Link removed');
}

function addLinkToStorage() {
    
}

function removeLinkFromStorage() {

}

function loadLinkFromStorage() {

}

ul.addEventListener('click', removeLink);

addBtn.addEventListener('click', () => {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
        addLink(tabs);
    });
});

clearAllBtn.addEventListener('click', () => {
    console.log('Clearing list...');
});
