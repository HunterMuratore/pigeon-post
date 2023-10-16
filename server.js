const express = require('express');
const view_routes = require('./controllers/view_routes');

const PORT = process.env.PORT || 3333;

const app = express();

// Open Middleware channels
app.use(express.static('./public'));
app.use('/', view_routes);

app.listen(PORT, () => console.log('Server started on port', PORT));