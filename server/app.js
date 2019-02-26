const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// app.use('/api/v1/products', productRouter);
// app.use('/api/v1/sales', salesRouter);













app.listen(port, ()=>{
	console.log(`Server started on port ${port}`)
});




module.exports = {
	app
}
