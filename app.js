const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter =  require('./Router/apiRouter');

const hostname = '127.0.0.1';
const port = 1500;


//configure bodyparser
const jsonParser = bodyParser.json();
const urlEncodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(jsonParser);
app.use(urlEncodedBodyParser);

//configure cors
app.use(cors());

//configure the router
app.use('/Router', apiRouter);

//getrequest
app.get('/', (request,response) => {
    response.send(`<h2> Welcome to express server of Employee Portal</h2>`);
});

app.listen(port, hostname, ()=> {
    console.log(`Express Server is started at http://${hostname}:${port}`);
});