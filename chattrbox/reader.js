var fs = require('fs');

var handleError  = function (err, res) {
    res.writeHead(302, {
        'Location': 'error.html'
    });
    res.end();
};

var readFile = function (filePath, res) {
    fs.readFile(filePath, function (err, data) {
        if(err){
            handleError(err, res);
            return;
        } else {
            res.end(data);
        }
    })
};
module.exports = readFile;