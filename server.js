const express = require('express');
const view_routes = require('./controllers/view_routes');

const PORT = process.env.PORT || 3333;

const app = express();

// Open the static channel for our browser assets - ie. express.static on the public folder
express.static('./public')

// Load our view routes at the root level '/'
app.use('/', view_routes);

// Start the server and log the port that it started on
app.listen(PORT, () => console.log('Server started on port', PORT));