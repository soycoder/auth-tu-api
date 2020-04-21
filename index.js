const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const https = require("https");
const PORT = process.env.PORT || 5000
// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all ads
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to api TU-Auth // author Soycoder</h1>")
});

app.get("/api/auth/", (_req, _res) => {
  var options = {
    method: "POST",
    hostname: "restapi.tu.ac.th",
    path: "/api/v1/auth/Ad/verify",
    headers: {
      "Content-Type": "application/json",
      "Application-Key":
        "MjU0OTNkYjM1MWE5Mzk0MGVlNzU3MGUyMzRiYWQ0N2ZkOGFmMGJkMWVkNjBiMDEwYTJhZTliMzNkZGU5ZTMzMw==",
    },
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      _res.status(200).json(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData =
    '{\n\t"UserName":"' +
    _req.body.username +
    '",\n\t"PassWord":"' +
    _req.body.password +
    '"\n}';

  req.write(postData);

  req.end();
});

// starting the server
app.listen(PORT, () => {
  console.log("listening on port ${PORT}");
});
