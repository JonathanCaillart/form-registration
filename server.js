const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "registration",
  user: "root",
  password: "secret"
});

app.post("/register", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  connection.connect(function(err) {
    if (err) throw err;

    connection.query("INSERT INTO users SET ?", user, function(err) {
      if (err) throw err;

      return res.redirect("success.html");
    });
  });
});

app
  .get("/", function(req, res) {
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("server listening at port 3000");

function Validate() {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("txtConfirmPassword").value;
  if (password != confirmPassword) {
      alert("Passwords do not match.");
      return false;
  }
  return true;
}
