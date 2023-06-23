const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('port',process.env.PORT|4001);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/EMQU',require('./routes/routes'));

app.listen(app.get('port'),()=>console.log('Serve on Port',app.get('port')));