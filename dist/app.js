'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _auth = require('./routes/auth');

var _message = require('./routes/message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/api/v1/auth', _auth.authRouter);
app.use('/api/v2/auth', _auth.authRouterv2);
app.use('/api/v1/message', _message.messageRouter);
app.use('/api/v2/message', _message.messageRouterv2);
app.get('/', function (req, res) {
  res.send({ message: 'Welcome to EPIC Mail Services' });
});
// app.use('*', (req, res) => {
//   res.status(404).send({ error: 'Invalid Route' });
// });

app.listen(port, function () {
  console.log('Server started on port ' + port);
});

exports.default = app;
//# sourceMappingURL=app.js.map