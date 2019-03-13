import express from "express";
import bodyParser from "body-parser";
// import {sendResponse} from "./helpers/responses";
import {authRouter} from "./routes/contacts";
import {messageRouter} from "./routes/message";

const app = express();
const port = process.env.PORT || 3000;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/message', messageRouter );
app.get("/", (req, res) => {
  res.send({ message: "Welcome to EPIC Mail Services" });
});
app.use("*", (req, res) => {
  res.status(404).send({ error: "Invalid Route" });
});

app.listen(port, () => {
console.log ( `Server started on port ${port}`);
});


export default app;

