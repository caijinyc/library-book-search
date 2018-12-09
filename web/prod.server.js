const express = require('express');
// var config = require('./config/index')
const app = express();
app.use(express.static('./dist'));

const port = 3003;

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});