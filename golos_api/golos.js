const golos = require('golos-js');

// golos.config.set('websocket', 'wss://ws.testnet3.golos.io');
// golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');


async function getPrivateKeys (username, password, roles = []) {
    return golos.auth.getPrivateKeys(username, password, roles);
}

async function getAccountDetails (username) {
    return golos.api.getAccounts([username]);
}

async function authorization (username, password) {
    let privWif = golos.auth.toWif(username, password, 'owner');

    return getAccountDetails(username)
        .then(response => {
            if (!response) {
                return false;
            }

            let pubWif = golos.auth.wifToPublic(privWif);
            if (response[0].owner.key_auths[0][0] != pubWif) {
                return false;
            }

            return getPrivateKeys(username, password, ['active', 'posting'])
                .then(keys => {
                    return {
                        user: username,
                        activePrivKey: keys.active,
                        postingPrivKey: keys.posting
                    }
                });
        });
}

async function transferGolos (wif, from, to, count, description) {
    return getAccountDetails(from)
        .then(result => {
            debugger;
            if (+result[0].balance.split(' ')[0] < count) {
                return false;
            }

            return golos.broadcast.transfer(wif, from, to, count + ' GOLOS', description);
        });
    
}

async function set() {

}

module.exports = {
    getPrivateKeys,
    authorization,
    getAccountDetails,
    transferGolos
};
