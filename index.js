var express = require('express')
var app = express()
var path = require('path')
var jwt = require('jsonwebtoken')

var getBody = function (req) {
  var bodyStr = '';
  return new Promise(function (resolve, reject) {
    req.on('data', function (chunk) {
      bodyStr += chunk.toString();
    });
    req.on('end', function () {
      resolve(bodyStr)
    })
  })
}


app.post('/', function (req, res) {
  getBody(req).then(function (data) {
    if (data.includes('payload=')) {
      try {
        var token = data.split('payload=')[1]
        var decoded = jwt.verify(token, 'secret')

        app.use(express.static('dist'))
        res.sendFile(path.join(__dirname + '/dist/index.html'));
      } catch(err) {
        res.send('Sorry the token cannot be verified')
      }
    } else {
      res.send('No Token Available')
    }
  })
})

app.listen(3000)
