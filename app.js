/*
Prompt for users preferenced handle.
Get current url.
Change url to include # and change current document title with user handle
*/
let userId = prompt("Enter your name:",);
let url = window.location.href;
let changeUrl = (url, userId) => {
    let new_url = url + '#' + userId;
    window.history.pushState('data', 'Title', new_url);
    document.title = "Grit-Chat: Logged in as " + userId;
};
changeUrl(url, userId);

// Set up peer connection using ID
let peer = new Peer(userId, {
    host: 'glajan.com',
    port: 8443,
    path: '/myapp',
    secure: true
});

// 
peer.on('open', peerOnConnection = (id) => {
    document.querySelector('.my-peer-id').innerHTML = id;
});


let isEven = num => console.log(num % 2 == 0 ? 'Is Even' : 'Is Odd');

function isOdd(num) {
    let test = num % 2 == 0 ? 'Is Even' : 'Is Odd';
    console.log(test);
}

isEven(2);
isOdd(3);