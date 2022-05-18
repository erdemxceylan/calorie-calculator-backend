import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/router.js';

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});
app.use(routes);

app.listen(8080);
