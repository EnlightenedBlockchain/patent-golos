const BaseRoute = require('../common/BaseRoute');


module.exports = class LoginRoute extends BaseRoute {
    constructor(){
        super();
        this.actionSignIn = this._actionSignIn;
        this.actionSignUp = this._actionSignUp;
    }

    _actionSignIn(req, res) {
        if(req.body){
            let email = req.body.email;
            let password = req.body.password;
            res.send({status: 1});
        } else {
            res.send({status: -1, err_code: 400, message: 'Invalid input params'});
        }
    }

    _actionSignUp(req, res) {
        if(req.body){
            let email = req.body.email;
            let password = req.body.password;
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;

            res.send({status: 1});
        } else {
            res.send({status: -1, err_code: 400, message: 'Invalid input params'});
        }
    }
};