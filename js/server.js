var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

//app.use(express.static('public'));
app.use('/static', express.static(__dirname + '../public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public','index.html'));
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Ha ocurrido un error', err);
    }
    console.log('Server escuchando en ' + port);
})