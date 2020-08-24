let userHandle = prompt("Enter your name:",);
let url = window.location.href;
function changeUrl(url, userHandle) {
    var new_url = url + '#' + userHandle;
    window.history.pushState('data', 'Title', new_url);
    document.title = "Grit-Chat: Logged in as " + userHandle;
}
changeUrl(url, userHandle);
console.log(userHandle);
const userId = location.hash.slice(1);

console.log(userId);

let peer = new Peer(userId, {
    host: 'glajan.com',
    port: 8443,
    path: '/myapp',
    secure: true
});


peer.on('open', peerOnConnection = (id) => {
    console.log('My peer id is: ' + id);
    document.querySelector('.my-peer-id').innerHTML = id;
});


let isEven = num => console.log(num % 2 == 0 ? 'Is Even' : 'Is Odd');

function isOdd(num) {
    let test = num % 2 == 0 ? 'Is Even' : 'Is Odd';
    console.log(test);
}

isEven(2);
isOdd(3);