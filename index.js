// index.js
// where your node app starts

var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
    const inputDate=new Date(Date.now());
    const timeStamp=Date.now();
    const utcTime=inputDate.toUTCString();
    res.send({"unix":timeStamp, "utc":utcTime});
});


app.get("/api/:time", function (req, res) {
  const inputTime=req.params.time;
  var inputDate, timeStamp, utcTime;
  console.log(isNaN(Date.parse(inputTime)));
  if(isNaN(Date.parse(inputTime))===false){
    inputDate=new Date(inputTime);
    timeStamp=inputDate.getTime();
    utcTime=inputDate.toUTCString();
    res.send({"unix":timeStamp, "utc":utcTime});
  } else if(/^\d*?0{5}$/.test(inputTime)){
    inputDate=new Date(inputTime*1);
    timeStamp=inputTime*1;
    utcTime=inputDate.toUTCString();
    res.send({"unix":timeStamp, "utc":utcTime});
  } else if(inputTime!==''&& isNaN(Date.parse(inputTime))===true){
    res.send({"error":"Invalid Date"});
  } 
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
