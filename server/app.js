const express = require("express");
const bodyParser = require("body-parser");
const {sendResponse} = require("./helpers/responses");
const {contactRouter} = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 3000;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/api/v1/', contactRouter);
// app.use('/api/v1/', );
app.get("/", (req, res) => {
  res.send({ message: "Welcome to EPIC Mail Services" });
});
app.use("*", (req, res) => {
  res.status(404).send({ error: "Invalid Route" });
});

app.listen(port, () => {
console.log ( `Server started on port ${port}`);
});


module.exports = {
	app
};