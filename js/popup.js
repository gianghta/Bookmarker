const addBtn = document.querySelector('#addBtn');
const clearAllBtn = document.querySelector('#clearBtn');
const ul = document.querySelector('.list-unstyled');

console.log('Loaded resource');

addBtn.addEventListener('click', () => {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
        let url = tabs[0].url;
        let title = tabs[0].title;
        let icon = tabs[0].favIconUrl;
        console.log('Current tabs:', url);
        console.log('Title: ', title);
        console.log('Icon: ', icon);
    });
});

clearAllBtn.addEventListener('click', () => {
    console.log('Clearing list...');
});

