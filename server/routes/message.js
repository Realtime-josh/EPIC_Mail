const express = require("express");
const messageRouter = express.Router();
const {createMessage} = require("../helpers/validators");
const {Message}  = require("../models/messages");





messageRouter.post("/sendmessage",createMessage,(req,res)=>{
      const {messageDetails} = req;
      Message.messages.push(messageDetails);
      res.status(200).send({
               status :200,
               message : "Message successfully sent",
               messageDetails : messageDetails
      });   
});










module.exports = {
	messageRouter
};