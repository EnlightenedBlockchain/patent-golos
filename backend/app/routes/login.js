const BaseRoute = require('../common/BaseRoute');


module.exports = class LoginRoute extends BaseRoute {
    constructor(){
        super();
        this.actionSignIn = this._actionSignIn;
    }

    _actionSignIn() {
        super.prototype.app.res.send('OK');
    }
};