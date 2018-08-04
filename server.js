var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

//app.use("/public", express.static(path.resolve(__dirname,'../', 'public')));
//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/css'));
// app.use(express.static(__dirname + '/public/js'));
// app.use(express.static(__dirname + '/public/img'));
// app.use(express.static(__dirname + '/../css'));
// app.use(express.static(__dirname + '/../js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    // res.sendFile(__dirname + '/public/css/materialize.css');
    // res.sendFile(__dirname + '/public/css/style.css');
    //res.sendFile(path.join(__dirname, '../img/', 'study_large_table.jpg'));
})

/*app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, 'materialize.js'));
    res.sendFile(path.join(__dirname, 'init.js'));
})*/

app.listen(port, (err) => {
    if (err) {
        return console.log('Ha ocurrido un error', err);
    }
    console.log(__dirname);
    console.log('Server escuchando en ' + port);
})
