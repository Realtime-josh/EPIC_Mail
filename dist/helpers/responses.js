"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sendResponse = function sendResponse(res, status, message, error) {
  res.status(status).send({
    status: status,
    message: message || undefined,
    error: error || undefined
  });
};

exports.sendResponse = sendResponse;
//# sourceMappingURL=responses.js.map