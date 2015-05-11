var express = require('express');
var router = express.Router();

var routesMap = require('./routes');

for (var key in routesMap) {
    /* GET home page. */
    if (routesMap.hasOwnProperty(key)) {
        router.get(key, function(req, res, next) {

          res.render('index', { 
                title: 'Express',
                scripts: routesMap[key]
            });
        });
    };

}

module.exports = router;
