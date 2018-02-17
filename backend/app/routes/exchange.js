const BaseRoute = require('../common/BaseRoute');


module.exports = class ExchangeRoute extends BaseRoute {
    constructor(){
        super();
        this.actionNear = this._actionNear;
    }

    _actionNear(req, res) {

    }
};