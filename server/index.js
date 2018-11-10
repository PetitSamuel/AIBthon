const express = require('express');
const cors = require('cors');

const app = express();


app.enable("trust proxy");

app.use(cors());
app.use(express.json());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mypassword',
  database : 'AIBthon'
});

connection.connect();

app.get('/', (req, res) => {
    res.json({
        message: "default page for API"
    })
    return res;
});

app.get('/deals', (req, res, next) => {
    connection.query('SELECT * FROM deals', function (error, results, fields) {
        if (error) throw error;
        res.json({
            status: 200,
            items: results.length,
            data : results
        })
      });
    return res;
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
