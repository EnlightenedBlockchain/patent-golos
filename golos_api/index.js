const Provider = require('./golos-provider');
const golos = require('golos-js');
const log = console.log;

const username = 'test';
const password = 'test';


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
    .then(result => console.log(result))
    .catch(err => console.log(err));
