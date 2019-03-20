<<<<<<< HEAD
'use strict';
=======
"use strict";
>>>>>>> user can get specific mail by its id

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageRouterv2 = exports.messageRouter = undefined;

<<<<<<< HEAD
var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validators = require('../helpers/validators');

var _responses = require('../helpers/responses');

var _messages = require('../models/messages');

var _users = require('../models/users');

var _db = require('../crud/db');
=======
var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _validators = require("../helpers/validators");

var _responses = require("../helpers/responses");

var _messages = require("../models/messages");

var _users = require("../models/users");

var _db = require("../crud/db");
>>>>>>> user can get specific mail by its id

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable radix */
var messageRouter = _express2.default.Router();
var messageRouterv2 = _express2.default.Router();

<<<<<<< HEAD
messageRouter.post('/messages', _validators.createMessage, function (req, res) {
=======
messageRouter.post("/messages", _validators.createMessage, function (req, res) {
>>>>>>> user can get specific mail by its id
  var messageDetails = req.messageDetails;

  _messages.Message.messages.push(messageDetails);
  res.status(200).send({
    status: 200,
<<<<<<< HEAD
    message: 'Message successfully sent',
=======
    message: "Message successfully sent",
>>>>>>> user can get specific mail by its id
    messageDetails: messageDetails
  });
});

<<<<<<< HEAD
messageRouter.get('/messages', function (req, res) {
=======
messageRouter.get("/messages", function (req, res) {
>>>>>>> user can get specific mail by its id
  res.status(200).send({
    status: 200,
    messageDetails: _messages.Message.messages
  });
});

<<<<<<< HEAD
messageRouter.get('/messages/:id', function (req, res) {
=======
messageRouter.get("/messages/:id", function (req, res) {
>>>>>>> user can get specific mail by its id
  var id = req.params.id;

  var verifyUser = _users.user.users.filter(function (result) {
    return result.userId === parseInt(id);
  });

  if (verifyUser.length > 0) {
    var receivedMessages = _messages.Message.messages.filter(function (result) {
      return result.receiverId === parseInt(id);
    });
    if (receivedMessages.length > 0) {
      var getName = _users.usersList.get(parseInt(id));
      res.status(200).send({
        status: 200,
<<<<<<< HEAD
        message: 'All received messages for ' + getName.fullName,
        receivedmessages: receivedMessages
      });
    } else {
      (0, _responses.sendResponse)(res, 200, 'No messages found for user', null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, 'Not Found');
  }
});

messageRouter.get('/messages/sent/:id', function (req, res) {
=======
        message: "All received messages for " + getName.fullName,
        receivedmessages: receivedMessages
      });
    } else {
      (0, _responses.sendResponse)(res, 200, "No messages found for user", null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, "Not Found");
  }
});

messageRouter.get("/messages/sent/:id", function (req, res) {
>>>>>>> user can get specific mail by its id
  var id = req.params.id;

  var verifyUser = _users.user.users.filter(function (result) {
    return result.userId === parseInt(id, 10);
  });

  if (verifyUser.length > 0) {
    var sentMessages = _messages.Message.messages.filter(function (result) {
      return result.senderId === parseInt(id, 10);
    });
    if (sentMessages.length > 0) {
      var getName = _users.usersList.get(parseInt(id, 10));
      res.status(200).send({
        status: 200,
<<<<<<< HEAD
        message: 'All Sent messages for ' + getName.fullName,
        sentmessages: sentMessages
      });
    } else {
      (0, _responses.sendResponse)(res, 200, 'No messages found for user', null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, 'Not Found');
  }
});

messageRouter.get('/messages/unread/:id', function (req, res) {
=======
        message: "All Sent messages for " + getName.fullName,
        sentmessages: sentMessages
      });
    } else {
      (0, _responses.sendResponse)(res, 200, "No messages found for user", null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, "Not Found");
  }
});

messageRouter.get("/messages/unread/:id", function (req, res) {
>>>>>>> user can get specific mail by its id
  var id = req.params.id;

  var verifyUser = _users.user.users.filter(function (result) {
    return result.userId === parseInt(id);
  });

  if (verifyUser.length > 0) {
    var unreadMessages = _messages.Message.messages.filter(function (result) {
<<<<<<< HEAD
      return result.receiverId === parseInt(id) && result.status === 'unread';
=======
      return result.receiverId === parseInt(id) && result.status === "unread";
>>>>>>> user can get specific mail by its id
    });
    if (unreadMessages.length > 0) {
      var getName = _users.usersList.get(parseInt(id));
      res.status(200).send({
        status: 200,
<<<<<<< HEAD
        message: 'All unread messages for ' + getName.fullName,
        unreadmessages: unreadMessages
      });
    } else {
      (0, _responses.sendResponse)(res, 200, 'No messages found for user', null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, 'Not Found');
  }
});

messageRouter.get('/email/:id', function (req, res) {
=======
        message: "All unread messages for " + getName.fullName,
        unreadmessages: unreadMessages
      });
    } else {
      (0, _responses.sendResponse)(res, 200, "No messages found for user", null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, "Not Found");
  }
});

messageRouter.get("/email/:id", function (req, res) {
>>>>>>> user can get specific mail by its id
  var id = req.params.id;

  var verifyUser = _users.user.users.filter(function (result) {
    return result.userId === parseInt(id);
  });
  if (verifyUser.length > 0) {
    var getEmail = verifyUser[0].email;
    res.status(200).send({
      status: 200,
<<<<<<< HEAD
      message: 'Email found',
      email: getEmail
    });
  } else {
    (0, _responses.sendResponse)(res, 404, null, 'Not Found');
  }
});

messageRouter.delete('/messages/:id', function (req, res) {
=======
      message: "Email found",
      email: getEmail
    });
  } else {
    (0, _responses.sendResponse)(res, 404, null, "Not Found");
  }
});

messageRouter.delete("/messages/:id", function (req, res) {
>>>>>>> user can get specific mail by its id
  var userId = req.query.userId;
  var id = req.params.id;

  var verifyUser = _users.user.users.filter(function (result) {
    return result.userId === parseInt(userId);
  });
  if (verifyUser.length > 0) {
    var messageToDelete = _messages.Message.messages.filter(function (result) {
      return result.receiverId === parseInt(userId);
    });

    if (messageToDelete.length > 0) {
      var getSpecificMail = messageToDelete.filter(function (result) {
        return result.messageId === parseInt(id);
      });

      if (getSpecificMail.length > 0) {
        var getSpecificMailId = getSpecificMail[0];
        _messages.Message.messages.splice(_messages.Message.messages.indexOf(getSpecificMailId), 1);
        res.status(200).send({
          status: 200,
<<<<<<< HEAD
          message: 'Email successfully deleted',
          messageDetails: getSpecificMail
        });
      } else {
        (0, _responses.sendResponse)(res, 200, 'no email to be deleted', null);
      }
    } else {
      (0, _responses.sendResponse)(res, 200, 'no email found', null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, 'Not Found');
  }
});

messageRouter.get('/messages/specificmail/:id', function (req, res) {
=======
          message: "Email successfully deleted",
          messageDetails: getSpecificMail
        });
      } else {
        (0, _responses.sendResponse)(res, 200, "no email to be deleted", null);
      }
    } else {
      (0, _responses.sendResponse)(res, 200, "no email found", null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, "Not Found");
  }
});

messageRouter.get("/messages/specificmail/:id", function (req, res) {
>>>>>>> user can get specific mail by its id
  var userId = req.query.userId;
  var id = req.params.id;

  var verifyUser = _users.user.users.filter(function (result) {
    return result.userId === parseInt(userId);
  });

  if (verifyUser.length > 0) {
    var messageToGet = _messages.Message.messages.filter(function (result) {
      return result.receiverId === parseInt(userId);
    });
    if (messageToGet.length > 0) {
      var getSpecificMail = messageToGet.filter(function (result) {
        return result.messageId === parseInt(id);
      });

      if (getSpecificMail.length > 0) {
        var getSpecificMailId = getSpecificMail[0];
        res.status(200).send({
          status: 200,
<<<<<<< HEAD
          message: 'Email successfully fetched',
          messageDetails: getSpecificMailId
        });
      } else {
        (0, _responses.sendResponse)(res, 200, 'Email successfully fetched', null);
      }
    } else {
      (0, _responses.sendResponse)(res, 200, 'no email found', null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, 'Not Found');
  }
});

messageRouterv2.post('/messages', _validators.senderItem, _validators.verifyToken, function (req, res) {
=======
          message: "Email successfully fetched",
          messageDetails: getSpecificMailId
        });
      } else {
        (0, _responses.sendResponse)(res, 200, "Email successfully fetched", null);
      }
    } else {
      (0, _responses.sendResponse)(res, 200, "no email found", null);
    }
  } else {
    (0, _responses.sendResponse)(res, 404, null, "Not Found");
  }
});

messageRouterv2.post("/messages", _validators.senderItem, _validators.verifyToken, function (req, res) {
>>>>>>> user can get specific mail by its id
  var _req$body = req.body,
      userDetails = _req$body.userDetails,
      receiverEmail = _req$body.receiverEmail,
      subject = _req$body.subject,
      message = _req$body.message,
      status = _req$body.status;
  var receiverId = req.receiverId;

  var senderId = userDetails[0].userid;
  (0, _db.getUserEmail)(receiverEmail).then(function (result) {
    if (result.length > 0) {
      var _receiverId = result[0].userid;
      var createdOn = new Date();
      (0, _db.insertMessage)(_receiverId, senderId, subject, message, status, createdOn);
<<<<<<< HEAD
      (0, _responses.sendResponse)(res, 200, 'message sent', null);
    } else {
      (0, _responses.sendResponse)(res, 400, null, 'Could not retrieve email');
    }
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 400, null, 'something went wrong');
  });
});

messageRouterv2.get('/messages', _validators.verifyToken, function (req, res) {
=======
      (0, _responses.sendResponse)(res, 200, "message sent", null);
    } else {
      (0, _responses.sendResponse)(res, 400, null, "Could not retrieve email");
    }
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 400, null, "something went wrong");
  });
});

messageRouterv2.get("/messages", _validators.verifyToken, function (req, res) {
>>>>>>> user can get specific mail by its id
  var userDetails = req.body.userDetails;

  var userId = userDetails[0].userid;
  (0, _db.getMessagesById)(userId).then(function (result) {
    if (result.length > 0) {
      var messageDetails = result;
<<<<<<< HEAD
      console.log(messageDetails);
=======
>>>>>>> user can get specific mail by its id
      (0, _responses.sendResponse)(res, 200, messageDetails, null);
    } else {
      res.status(404).send({
        status: status,
<<<<<<< HEAD
        message: 'No messages found for ' + userDetails[0].firstname
      });
    }
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 400, null, 'unable to fetch user data');
=======
        message: "No messages found for " + userDetails[0].firstname
      });
    }
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 400, null, "unable to fetch user data");
  });
});

messageRouterv2.get("/messages/unread", _validators.verifyToken, function (req, res) {
  var userDetails = req.body.userDetails;

  var userId = userDetails[0].userid;
  (0, _db.getMessagesByUnread)(userId).then(function (result) {
    if (result.length > 0) {
      var unReadMessages = result.filter(function (data) {
        return data.status === "unread";
      });
      (0, _responses.sendResponse)(res, 200, unReadMessages, null);
    } else {
      res.status(404).send({
        status: status,
        message: "No messages found for " + userDetails[0].firstname
      });
    }
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 400, null, "unable to fetch user data");
  });
});

messageRouterv2.get("/messages/sent", _validators.verifyToken, function (req, res) {
  var userDetails = req.body.userDetails;

  var userId = userDetails[0].userid;
  (0, _db.getMessagesBySent)(userId).then(function (result) {
    if (result.length > 0) {
      var messageDetails = result;
      (0, _responses.sendResponse)(res, 200, messageDetails, null);
    } else {
      res.status(404).send({
        status: status,
        message: "No messages found for " + userDetails[0].firstname
      });
    }
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 400, null, "unable to fetch user data");
  });
});

messageRouterv2.get("/messages/:id", _validators.verifyToken, function (req, res) {
  var id = req.params.id;
  var userDetails = req.body.userDetails;

  var userId = userDetails[0].userid;
  (0, _db.getMessagesBySpecificId)(userId, id).then(function (result) {
    if (result.length > 0) {
      var messageDetails = result;
      (0, _responses.sendResponse)(res, 200, messageDetails, null);
    } else {
      res.status(404).send({
        status: status,
        message: "No messages found for " + userDetails[0].firstname
      });
    }
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 400, null, "unable to fetch user data");
>>>>>>> user can get specific mail by its id
  });
});

messageRouterv2.delete("/messages/:id", _validators.verifyToken, function (req, res) {
  var id = req.params.id;
  var userDetails = req.body.userDetails;

  var userId = userDetails[0].userid;
  (0, _db.deleteBySpecificId)(userId, id).then(function () {
    (0, _responses.sendResponse)(res, 200, "Message deleted", null);
  }).catch(function (e) {
    (0, _responses.sendResponse)(res, 204, "Unable to fetch mail", null);
  });
});

exports.messageRouter = messageRouter;
exports.messageRouterv2 = messageRouterv2;
//# sourceMappingURL=message.js.map