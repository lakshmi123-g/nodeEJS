const port = 3005;
var http = require('http');
const express = require("express"),
  app = express();
var tmp = 0;
app.set("view engine", "ejs");


app.use(express.static('public'));
/*app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
})
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
})*/

const homeController = require("./controllers/homeController");
app.get("/data", homeController.respondWithjson);
http.createServer(function (req, res) {
  var receivedText = "";

  let request = http.get('http://58af0692ea1c.mylabserver.com:30081/api/v1/status/tsdb', (res2) => {
    if (res2.statusCode !== 200) {
      console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
      res2.resume();
      return;
    }

    let data = '';

    res2.on('data', (chunk) => {
      data += chunk;
    });


    res2.on('close', () => {
      console.log('Retrieved all data');
      console.log(data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      //res.end()
      res.end(data);

    });
  });


  tmp++;

/*app.listen(port, () => {
  console.log(`The Express.js server has started and is listening
      on port number: ${port}`);
});*/
})

app.listen(3005);