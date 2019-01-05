let express     = require('express');
let app         = express();
let sql         = require('mssql');
let bodyParser  = require('body-parser');
require('dotenv-safe').load();

// config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the routes
let index       = require('./routes/index.route');
let rt_people   = require('./routes/people.route');

app.use('/api', index);
app.use('/api/people', rt_people);

// connection sql server config
let port        = process.env.PORT;
let server      = app.listen(port, ()=>{
    console.log('Listen on port: ' + port);

    sql.connect(process.env.CONNSTRING)
        .then(conn => global.conn = conn)
        .catch(err => console.log(err));

});
