const express = require('express');
const cors = require('cors');
const app = express();
const randomWords = require('random-words');
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
        message: "default page for API²"
    })
    return res;
});

app.get('/deals', (req, res, next) => {
    connection.query('SELECT * FROM deals', function (error, results, fields) {
        if (error) {
            res.json({
                status: 404,
                items : 0,
                errors: error
            })
        } else {
            res.json({
                status: 200,
                items: results.length,
                data : results
            })
        }
      });
    return res;
});

app.post('/collect', (req, res, next) => {
    req = req.body;
    let query = 'SELECT isAvailable FROM codes WHERE code="' + req.words + '";';
    connection.query(query, function (error, results, fields) {
        if (results == undefined || results == null || results.length === 0 || results[0].isAvailable === 0){
            res.status(401);
            return res;
        }
    });

    connection.query('UPDATE codes SET isAvailable=0 WHERE code="' + req.words + '" LIMIT 1;', function (error, results) {
        console.log(results);
        if (results.changedRows === 1) {
            res.json({
                message: "Success!"
            });
            return;
        } else {
            res.status(401);
            res.json({
                message: "the words do not match or were already redeemed."
            })
            return;
        }
    });
    return res;
});

app.post('/deal', (req, res, next) => {
    req = req.body;
    console.log('received');
    let query = "";
    if (req.website) {
        query = "INSERT INTO deals(item, price,location,description,website) VALUES ('" + req.item +
        "'," + req.price + ",'" + req.location + "','" + req.description + "','" + req.website + "');";
    } else {
        query = "INSERT INTO deals(item, price,location,description) VALUES ('" + req.item +
        "'," + req.price + ",'" + req.location + "','" + req.description + "');";
    }

        console.log(query);
        connection.query(query, function (error, result, fields){
            console.log(error, result);
            if (error) {
                console.log("error");
                res.status(404);
                res.body = "fail";
                res.json({
                    status: 404,
                    error: true,
                    errors: error
                })
            } else {
                console.log("succedded");
                res.body = "success";
                res.json({
                    success: 'done'
                })
            }
        });
  });

  app.post('/buy', (req, res, next) => {
    req = req.body;
    console.log(req);
    let words = get3words();
    let query = "INSERT INTO codes(item_id, code) VALUES (" + req.id +
        ",'" + words + "');";
        console.log(query);
        connection.query(query, function (error, result, fields){
            console.log(error, result);
            if (error) {
                console.log("error");
                res.json({
                    status: 404,
                    error: true,
                    errors: error
                })
            } else {
                console.log("succedded");
                res.json({
                    status: 200,
                    code: words,
                    success: true
                })
            }
        });
  });

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});


function get3words () {
    return randomWords({exactly:1, wordsPerString:3})[0];
}