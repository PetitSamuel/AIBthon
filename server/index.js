const express = require('express');
const cors = require('cors');

const app = express();


app.enable("trust proxy");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        hello: 'waddup default page'
    })
    return res;
});

app.get('/deals', (req, res, next) => {
  // return all deals
});

app.post('/buy', (req, res, next) => {
    res.json({
        hello: 'heyheyeeyeheyehey'
    })
  // buy somthing
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});
