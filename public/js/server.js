var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

//app.use(express.static('public'));
app.use('/static', express.static('/public/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../','index.html'));
})

/*app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, 'materialize.js'));
    res.sendFile(path.join(__dirname, 'init.js'));
})*/

app.listen(port, (err) => {
    if (err) {
        return console.log('Ha ocurrido un error', err);
    }
    console.log('Server escuchando en ' + port);
})