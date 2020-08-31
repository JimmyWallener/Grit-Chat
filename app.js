/*
Prompt for users preferenced handle.
Get current url.
If no handle is given, sets handle to Anonymous with an adjacent random number
*/
// Self invoked anonymous function (function () {})();
(function () {
    let peer = null;
    const url = window.location.href;
    let clientId = prompt("Enter your name:",);
    if (clientId == null || clientId == "") {
        const max = 1;
        const min = 10000;
        clientId = "Anonymous" + Math.floor(Math.random() * (max - min) + min)
    }

    /*  Updates URL with prompted name
        If refreshing webpage for new username input, #clientId stacks in url.
        Removes #clientId from url, leaving just https://url/path/
        But still holds value for peer communication
    */
    let changeUrl = (url, id) => {
        id = location.hash.slice(1);
        let new_url = url + id;
        window.history.pushState('data', new_url);
    };
    changeUrl(url, clientId);

    // Set up peer connection using ID
    peer = new Peer(clientId, {
        host: 'glajan.com',
        port: 8443,
        path: '/myapp',
        secure: true
    });


    peer.on('open', connnectionSuccess = (id) => {
        document.querySelector('.my-peer-id').innerHTML = id;
    });
    peer.on('error', errorMsg = (error) => {
        console.log(error);
    })


    // Refresh connected userlist every minute
    setInterval(() => {
        refreshUserList(clientId);
    }, 30000 * 10);

    // Manually refresh userlist
    document.querySelector('.list-all-peers-button').addEventListener('click', () => {
        refreshUserList(clientId);
    });






    /*
    Functions here
    
    */

    function refreshUserList(id) {

        peer.listAllPeers((peers) => {
            console.log(peers);

            const connectedUsers = document.querySelector('.peers');
            const ul = document.createElement('ul');

            //removing existing elements, needed for not stacking queries.
            while (connectedUsers.lastChild) {
                connectedUsers.removeChild(connectedUsers.lastChild);
            }

            peers.filter((users) => users !== id)
                .map(user => {
                    console.log(user);
                    const li = document.createElement('li');
                    const button = document.createElement('button');
                    button.innerText = user;
                    button.classList.add('connect-btn');
                    button.classList.add(`ID-${user}`);
                    li.appendChild(button);
                    ul.appendChild(li);
                });
            connectedUsers.appendChild(ul);
        });
    };
})();