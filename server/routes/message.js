/* eslint-disable radix */
import express from 'express';
import { createMessage } from '../helpers/validators';
import { sendResponse } from '../helpers/responses';
import { Message } from '../models/messages';
import { usersList, user } from '../models/users';


const messageRouter = express.Router();

messageRouter.post('/messages', createMessage, (req, res) => {
  const { messageDetails } = req;
  Message.messages.push(messageDetails);
  res.status(200).send({
    status: 200,
    message: 'Message successfully sent',
    messageDetails,
  });
});


messageRouter.get('/messages', (req, res) => {
  res.status(200).send({
    status: 200,
    messageDetails: Message.messages,
  });
});


messageRouter.get('/messages/:id', (req, res) => {
  const { id } = req.params;
  const verifyUser = user.users.filter(result => result.userId === parseInt(id));

  if (verifyUser.length > 0) {
    const receivedMessages = Message.messages.filter(result => result.receiverId === parseInt(id));
    if (receivedMessages.length > 0) {
      const getName = usersList.get(parseInt(id));
      res.status(200).send({
        status: 200,
        message: `All received messages for ${getName.fullName}`,
        receivedmessages: receivedMessages,
      });
    } else {
      sendResponse(res, 200, 'No messages found for user', null);
    }
  } else {
    sendResponse(res, 404, null, 'Not Found');
  }
});


messageRouter.get('/messages/sent/:id', (req, res) => {
  const { id } = req.params;
  const verifyUser = user.users.filter(result => result.userId === parseInt(id, 10));

  if (verifyUser.length > 0) {
    const sentMessages = Message.messages.filter(result => result.senderId === parseInt(id, 10));
    if (sentMessages.length > 0) {
      const getName = usersList.get(parseInt(id, 10));
      res.status(200).send({
        status: 200,
        message: `All Sent messages for ${getName.fullName}`,
        sentmessages: sentMessages,
      });
    } else {
      sendResponse(res, 200, 'No messages found for user', null);
    }
  } else {
    sendResponse(res, 404, null, 'Not Found');
  }
});


messageRouter.get('/messages/unread/:id', (req, res) => {
  const { id } = req.params;
  const verifyUser = user.users.filter(result => result.userId === parseInt(id));

  if (verifyUser.length > 0) {
    const unreadMessages = Message.messages.filter(result => result.receiverId === parseInt(id) && result.status === 'unread');
    if (unreadMessages.length > 0) {
      const getName = usersList.get(parseInt(id));
      res.status(200).send({
        status: 200,
        message: `All unread messages for ${getName.fullName}`,
        unreadmessages: unreadMessages,
      });
    } else {
      sendResponse(res, 200, 'No messages found for user', null);
    }
  } else {
    sendResponse(res, 404, null, 'Not Found');
  }
});


messageRouter.get('/email/:id', (req, res) => {
  const { id } = req.params;
  const verifyUser = user.users.filter(result => result.userId === parseInt(id));
  if (verifyUser.length > 0) {
    const getEmail = verifyUser[0].email;
    res.status(200).send({
      status: 200,
      message: 'Email found',
      email: getEmail,
    });
  } else {
    sendResponse(res, 404, null, 'Not Found');
  }
});


messageRouter.delete('/messages/:id', (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;
  const verifyUser = user.users.filter(result => result.userId === parseInt(userId));
  if (verifyUser.length > 0) {
    const messageToDelete = Message.messages.filter(result => result.receiverId === parseInt(userId));

    if (messageToDelete.length > 0) {
      const getSpecificMail = messageToDelete.filter(result => result.messageId === parseInt(id));


      if (getSpecificMail.length > 0) {
        const getSpecificMailId = getSpecificMail[0];
        Message.messages.splice(Message.messages.indexOf(getSpecificMailId), 1);
        res.status(200).send({
          status: 200,
          message: 'Email successfully deleted',
          messageDetails: getSpecificMail,
        });
      } else {
        sendResponse(res, 200, 'no email to be deleted', null);
      }
    } else {
      sendResponse(res, 200, 'no email found', null);
    }
  } else {
    sendResponse(res, 404, null, 'Not Found');
  }
});


messageRouter.get('/messages/specificmail/:id', (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;
  const verifyUser = user.users.filter(result => result.userId === parseInt(userId));

  if (verifyUser.length > 0) {
    const messageToGet = Message.messages.filter(result => result.receiverId === parseInt(userId));
    if (messageToGet.length > 0) {
      const getSpecificMail = messageToGet.filter(result => result.messageId === parseInt(id));

      if (getSpecificMail.length > 0) {
        const getSpecificMailId = getSpecificMail[0];
        res.status(200).send({
          status: 200,
          message: 'Email successfully fetched',
          messageDetails: getSpecificMailId,
        });
      } else {
        sendResponse(res, 200, 'Email successfully fetched', null);
      }
    } else {
      sendResponse(res, 200, 'no email found', null);
    }
  } else {
    sendResponse(res, 404, null, 'Not Found');
  }
});


export {
  messageRouter,
};
