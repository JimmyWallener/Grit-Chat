/*
Prompt for users preferenced handle.
Get current url.
If no handle is given, sets handle to Anonymous with an adjacent random number
*/
// Self invoked anonymous function (function () {})();
(function () {
    let peer = null;
    let conn = null;
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

    const connectToPeerClick = (e) => {
        console.log(e);
        const peerId = e.target.textContent;
        conn && conn.close();
        console.log(peerId);
        conn = peer.connect(peerId);
        conn.on('open', () => {
            console.log("connection open");
            const event = new CustomEvent('peer-changed', { detail: { peerId: peerId } });
            document.dispatchEvent(event);
        });
        console.log(conn);
    };

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
            connectedUsers.firstChild && connectedUsers.firstChild.remove();
            //removing existing elements, needed for not stacking queries.
            /* while (connectedUsers.lastChild) {
                connectedUsers.removeChild(connectedUsers.lastChild);
            } */

            peers.filter((users) => users !== id)
                .map(user => {
                    console.log(user);
                    const li = document.createElement('li');
                    const button = document.createElement('button');
                    button.innerText = user;
                    button.classList.add('connect-button');
                    button.classList.add(`ID-${user}`);
                    button.addEventListener('click', connectToPeerClick);
                    li.appendChild(button);
                    ul.appendChild(li);
                });
            connectedUsers.appendChild(ul);
        });
    };
    document.addEventListener('peer-changed', (e) => {
        const peerId = e.detail.peerId;
        console.log(peerId);
        document.querySelector('.name').innerHTML = peerId;
        document.querySelectorAll('connect-button.connected').forEach(e => {
            e.classList.remove('.connected');
        })
        const btnConnected = document.querySelector(`.connect-button.ID-${peerId}`);
        btnConnected.classList.add('connected');

        console.log(btnConnected);


    })
})();