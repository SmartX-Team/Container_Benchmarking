var express = require('express');
var path = require('path');
var influx = require('influx');
var app;
app = express();

var influxClient = influx({
  // single-host configuration
  host : 'K-BOX',
  port : 8086, // optional, default 8086
  protocol : 'http', // optional, default 'http'
  username : 'admin',
  password : 'admin',
  database : 'cMonitoring'
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

var query = 'SELECT last(nodes), last(edges) FROM cMonitoring WHERE time > now() - 1d;';
var tmp;
app.get('/data', function(req, response){
// db에서 쿼리 가져와서 보내야지
  var nodes;
  var edges;
  try{
  influxClient.query(query, function(err, res){
    if(res != null){
      nodes = res[0][0].last;
      edges = res[0][0].last_1;
      nodes = JSON.parse(nodes);
      edges = JSON.parse(edges);
      response.json({nodes: nodes, edges: edges});
    }else response.json(null);
  });}
  catch(e){console.log("InfluxDB failed!"); response.json(null);}
});



app.get('/', function(req, res){
  res.sendFile(__dirname + '/pvis.html');
});

app.get('/jquery', function(req, res){
  res.sendFile(__dirname + '/jquery.min.js');
});

app.get('/cytoscape', function(req, res){
  res.sendFile(__dirname + '/cytoscape.min.js');
});

app.listen(21111);

