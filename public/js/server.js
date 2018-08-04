var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

//app.use("/public", express.static(path.resolve(__dirname,'../', 'public')));
//app.use(express.static('public'));
app.use('/static', express.static('/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname,'../../', 'index.html');
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