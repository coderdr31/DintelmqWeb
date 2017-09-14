var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');

});
router.get('/eventkey', function(req, res, next) {
    var fs = require('fs');
    var file = "/home/dr/Desktop/dworkspace/intelmq-web/data/harmonization.conf";
    var data = JSON.parse(fs.readFileSync(file));
    res.json(data);
})
/* add confs */
router.post('/addconf', function(req, res, next) {
    var fs = require('fs');
    var filename = "/home/dr/Desktop/dworkspace/intelmq-web/data/1.conf";
    // console.log(req.body.Data);
    var data = JSON.parse(req.body.Data);
    data = JSON.stringify(data,null,4);
    console.log(data);
    // fs.writeFileSync(filename, JSON.stringify(req.body));
    fs.writeFileSync(filename, data);

});

module.exports = router;

