const Provider = require('./golos');
const golos = require('golos-js');
const log = console.log;

const username = 'pahatrop';
const password = 'P5KJ2Ea3zTMbySuM7Lu6LyevxpMVCF9346QBy5AepbzDt9XspayK';


return Provider.authorization(username, password)
    .then(result => {
        console.log(result);
        return Provider.transferGolos(
            result.activePrivKey,
            result.user,
            'dyadyajora',
            0.001,
            'test'
        );
    })
    .then(result => console.log(1, result))
    .catch(err => console.log(1, err));