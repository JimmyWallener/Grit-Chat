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



