const addBtn = document.querySelector('#addBtn');
const clearAllBtn = document.querySelector('#clearBtn');
const ul = document.querySelector('.list-unstyled');

console.log('Loaded resource');

function createHtmlLink(tabs) {
    let url = tabs[0].url;
    let title = tabs[0].title;
    let icon = tabs[0].favIconUrl;
    console.log('Current tabs:', url);
    console.log('Title: ', title);
    console.log('Icon: ', icon);

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '');
    a.setAttribute('title', '');
    a.textContent = title;
    const span = document.createElement('span');
    span.classList.add('float-right');
    span.textContent = 13;

    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);
}

addBtn.addEventListener('click', () => {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
        createHtmlLink(tabs);
    });
});

clearAllBtn.addEventListener('click', () => {
    console.log('Clearing list...');
});
