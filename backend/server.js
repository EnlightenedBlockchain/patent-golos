const express        = require('express');
const bodyParser     = require('body-parser');
const fs             = require('fs');
const app            = express();
const port = 8000;
const routePath = './app/routes';

function getAllFuncs(obj) {
    return Object.getOwnPropertyNames(obj);
}

fs.readdir(routePath, (err, files) => {
    files.forEach(file => {
        let route = new (require(routePath+'/'+file));
        route.initialize({});
        getAllFuncs(route).forEach((method) => {
            if (~method.indexOf('action')) {
                let basePath = file.split('.')[0];
                let action = method.split('action')[1].replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
                let url = '/' + basePath + '/' + action;

                console.log(url);
                app.all(url, function (req, res) {
                    route[method]();
                });
            }
        });
    });
});

// app.get('*', function(req, res){
//     res.send('what???', 404);
// });


app.listen(port, () => {
    console.log('We are live on ' + port);
});