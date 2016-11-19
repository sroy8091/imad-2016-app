var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var pool = new Pool({
  user: 'sroy8091',
  password: env.DB_PASSWORD,
  host: 'db.imad.hasura-app.io',
  database: 'sroy8091',
  max: 10, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
  port: '5432'
});

var app = express();
app.use(morgan('combined'));

var counter = 0;
// var pool = new Pool(config)


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM article', function(err, result){
      if (err){
        res.status(500).send(err.toString());
      }
      else{
        res.send(JSON.stringify(result));
      }
  });
});

var names = [];
app.get('/submit-name', function(req, res){ //url=submit-name?name=xxxx
    //for params url app.get('submit-name/:name') and req.params.name
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('blog', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'))
})

app.get('/article-one', function(req, res){
    res.send("Article 1 is not here");
});

app.get('/article-two', function(req, res){
    res.send("Article 2 is not here");
});

app.get('/article-three', function(req, res){
    res.send("Article 3 is not here");
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
