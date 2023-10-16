const express = require('express');
const view_routes = require('./controllers/view_routes');
const user_routes = require('./controllers/user_routes');
require('dotenv').config();

const PORT = process.env.PORT || 3333;

const app = express();

// Open Middleware channels
app.use(express.json());
app.use(express.static('public'));

// Open our routes at the root level
app.use('/', view_routes);
app.use('/auth', user_routes);

app.listen(PORT, () => console.log('Server started on port', PORT));
