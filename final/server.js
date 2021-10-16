const fs = require('fs');
const ndjson = require('ndjson');
let drawings = [];
fs.createReadStream('quickdrawdata.ndjson')
  .pipe(ndjson.parse())
  .on('data', function(obj){
    drawings.push(obj);
  })

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, ()  => {
    console.log(`example app listening on port ${port}!`)
});

app.get('/quickdraw',(request, response) => {
    const index = Math.floor(Math.random() *drawings.length);
    response.send(drawings[index]);
});

app.use(express.static('public'))