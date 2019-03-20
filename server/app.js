import express from 'express';
import bodyParser from 'body-parser';
import { authRouter, authRouterv2 } from './routes/auth';
import { messageRouter, messageRouterv2 } from './routes/message';
import  groupRouter from './routes/groups';

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/auth', authRouter);
app.use('/api/v2/auth', authRouterv2);
app.use('/api/v1/message', messageRouter);
app.use('/api/v2/message', messageRouterv2);
app.use('/api/v2/groups', groupRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to EPIC Mail Services' });
});
// app.use('*', (req, res) => {
//   res.status(404).send({ error: 'Invalid Route' });
// });

app.listen(port, () => {
  console.log (`Server started on port ${port}`);
});


export default app;
