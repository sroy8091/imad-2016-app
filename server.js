var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var pool = new Pool({
  user: 'sroy8091',
  password: process.env.DB_PASSWORD,
  host: 'db.imad.hasura-app.io',
  database: 'sroy8091',
  max: 10, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
  port: '5432'
});

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
  secret : 'SomeReallyShittyCode',
  cookie : {maxAge:1000*60*60*24*30},
}));


var counter = 0;
// var pool = new Pool(config)

function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var templateOne=
    `<html>
         <head>
             <link href="/ui/style.css" rel="stylesheet" />
                <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </head>
    <body>
        <div class="container">
            <div><small>${date}</small></div>
            <div>
                <h4>${heading}</h4>
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
</html>
`;
return templateOne;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

function hash(input, salt){
  var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
  return [salt, hashed.toString('hex')].join('$');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

app.get('/hash/:input', function(req, res){
  var hashedString = hash(req.params.input, 'This-is-somesalt');
  res.send(hashedString);
});

app.post('/createuser', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var name = req.body.name;
  var salt = crypto.randomBytes(128).toString('hex');
  var dbString = hash(password, salt);
  pool.query('INSERT INTO "user" (username, password, email, name) VALUES ($1, $2, $3, $4)', [username, dbString, email, name], function(err, result){
     if (err){
        res.status(500).send(err.toString());
      }
      else{
        res.send("User Successfully created "+username);
      }
  });
});

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username=$1', [username], function(err, result){
        if (err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.send(500).send('Username not found');
            }
            else{
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[0];
                var hashedString = hash(password, salt);
                if(hashedString===dbString){
                    console.log(yes);
                    //setting session id
                    req.session.auth = {userId:result.rows[0].id};
                    
                    res.send('Logged in successfully');
                }
                else{
                    res.send('Username or password is wrong');
                }
            }
        }
    });
  
});

app.get('/checklogin', function(req, res){
  if(req.session && req.session.auth && req.session.auth.userId){
    res.send('You are already logged in');

  }
  else{
    res.send('Your session has been expired');
  }
});

app.get('/articles/:articleName', function (req, res) {
    pool.query("SELECT * FROM article where title=$1", [req.params.articleName], function(err, result){
      if (err){
        res.status(500).send(err.toString());
      }
      else{
        if (result.rows.length===0){
          res.status(404).send('Article not found');
        }
        else{
          var articleData = result.rows[0];
          res.send(createTemplate(articleData));
        }
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

app.get('/blog', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.jpg'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// var port = 8080; // Use 8080 for local development because you might already have apache running on 80
// app.listen(8080, function () {
//   console.log(`IMAD course app listening on port ${port}!`);
// });
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function(){
  console.log("IMAD course app listening on port "+app.get('port')+" !");
});