var express = require('express')
  , logger = require('morgan')
  , app = express()
  , auth = require('basic-auth')
  , template = require('jade').compileFile(__dirname + '/views/water.jade')

app.use(logger('dev'))
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/credit', function (req, res, next) {
  try {
    res.render('credit')
  } catch (e) {
    next(e)
  }
})

app.get('/login', function(req, res, next){
  try {
    credentials = auth(req);
    if (!credentials || credentials.name !=='admin' || credentials.pass !== 'password')
    {
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', 'Basic realm="example"')
      res.end('Access denied')
    }
    else
    {
      res.end('Access Granted!')
    }
  } catch (e) {
  next(e)}
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
