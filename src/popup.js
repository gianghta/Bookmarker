// Chrome storage wrapper
const storage = chrome.storage.sync;

const addBtn = document.querySelector('#addBtn');
const clearAllBtn = document.querySelector('#clearBtn');
const ul = document.querySelector('.list-unstyled');
const announcement = document.querySelector('#annoucement');

console.log('Loaded resource');

document.addEventListener('DOMContentLoaded', getLinks);

addBtn.addEventListener('click', () => {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
        const tab = tabs[0];

        // Add link to the UI
        UIaddLink(tab);
        
        // Add link to storage
        const item = createLinkItem(tab);
        addLinkToStorage(item);

        console.log('Successfully add link');
    });
});

ul.addEventListener('click', UIremoveLink);

clearAllBtn.addEventListener('click', clearSyncStorage);

function getLinks() {
    let syncItems = new Array();

    storage.get(function(items) {
        for (let key in items) {
            let syncItem = {};
            syncItem['url'] = key;
            syncItem['info'] = items[key];
            syncItems.push(syncItem);
        }
    });
    console.log('New array:', syncItems);

    for (let syncItem of syncItems) {
        console.log(syncItem);
    }

    syncItems.forEach(function(syncItem) {
        console.log(syncItem);
        let url = syncItem.url;
        let title = syncItem.info.title ;
        let iconUrl = syncItem.info.icon;

        console.log(title);
        console.log(iconUrl);

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
    });

    console.log('Finished loading tasks');
}

function UIaddLink(tab) {
    let url = tab.url;
    let title = ` ${tab.title}`;
    let iconUrl = tab.favIconUrl;

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

function UIremoveLink(e) {
    if (e.target.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove();
            console.log(e.target.parentElement.firstChild.getAttribute('href'));
            const url = e.target.parentElement.firstChild.getAttribute('href');
            removeLinkFromStorage(url);
        }
    }
    console.log('Link removed');
}

function addLinkToStorage(urlItem) {
    storage.get(urlItem.url, function(itemFound) {
        if (isValidSyncItem(itemFound)) {
            itemExistHandler();
        } else {
            let item = {};
            item[urlItem.url] = urlItem.info;
            storage.set(item, () => {
                console.log('Item is saved into database');
            });
        }
    });
}

function removeLinkFromStorage(url) {
    storage.get(url, function(urlFound) {
        if (urlFound) {
            storage.remove(url, () => {
                console.log('Item successfully removed from storage');
            });
        } else {
            console.log('Could not remove item from storage');
        }
    });
}

function clearSyncStorage() {
    let confirmation = confirm('Do you want to delete everything?');
    if (confirmation) {
        storage.clear(function() {
            let error = chrome.runtime.lastError;
            if (error) {
                console.log(error);
            }
            console.log('All items cleared');
        });
    }
}

function itemExistHandler() {
    const newMessage = document.createTextNode('Total Links: Link\'s is already existed');
    if (announcement.childNodes[0]) {
        announcement.replaceChild(newMessage, announcement.childNodes[0]);
    }
}

function createLinkItem(tab) {
    let urlInfo = {'title': tab.title, 'timestamp': new Date().getTime(), 'icon': tab.favIconUrl};
    let urlItem = {'url': tab.url, 'info': urlInfo};
    return urlItem;
}

function isValidSyncItem(syncItem) {
    if (Object.keys(syncItem).length !== -1) {
        return false;
    }

    for (let key in syncItem) {
        if (typeof syncItem[key] !== 'object') {
            return false;
        }
    }
    return true;
}