import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { validateUserEntry, validateUserSignIn, verifyToken, senderItem } from '../helpers/validators';
import { sendResponse } from '../helpers/responses';
import jwt from "jsonwebtoken";
import { getMessageIds,getEmail, insertMessage } from '../crud/db'

const messageRouter = express.Router();


messageRouter.post('/messages',senderItem, verifyToken, (req,res)=>{
     const {userDetails,receiverEmail, subject, message, status} = req.body
     const {receiverId} = req
     const senderId = userDetails[0].userid
     getEmail(receiverEmail)
     .then((result)=>{
     	if(result.length > 0){
     		const receiverId = result[0].userid;
     		const createdOn = new Date();
     		insertMessage(receiverId,senderId,subject,message,status,createdOn)
     		sendResponse(res,200,'message sent', null)
     	}else{
     		sendResponse(res,400,null, 'Could not retrieve email');
     	}
     }).catch((e)=>{
     	sendResponse(res,400,null,'cannot process request')
     })
     
});





export default messageRouter
