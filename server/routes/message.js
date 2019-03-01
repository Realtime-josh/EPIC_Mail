const express = require("express");
const messageRouter = express.Router();
const {createMessage} = require("../helpers/validators");
const {Message}  = require("../models/messages");
const {usersList} = require("../models/users");
const {user} = require("../models/users");
const {sendResponse} = require("../helpers/responses");





messageRouter.post("/sendmessage",createMessage,(req,res)=>{
      const {messageDetails} = req;
      Message.messages.push(messageDetails);
      res.status(200).send({
               status :200,
               message : "Message successfully sent",
               messageDetails : messageDetails
      });   
});


messageRouter.get("/receivedmessages/:id", (req,res)=>{
	const {id} = req.params;
    const verifyUser = user.users.filter((result)=>{
               return result.userId === parseInt(id)
    });

    if(verifyUser.length > 0){
            const receivedMessages = Message.messages.filter((result)=>{
                                         return result.receiverId === parseInt(id);
                                     });
	if(receivedMessages.length > 0){
		const getName = usersList.get(parseInt(id));
     
     res.status(200).send({
        status : 200,
        message : `All received messages for ${getName.fullName}`,
        receivedmessages : receivedMessages
     });
 }else{
          sendResponse(res,200,"No messages found for user",null);
    }
    }else{
           sendResponse(res,404,null,"Not Found");
    }
                 
});


messageRouter.get("/sentemails/:id", (req,res)=>{
     const {id} = req.params;
     const verifyUser = user.users.filter((result)=>{
               return result.userId === parseInt(id);
    });

     if(verifyUser.length > 0){
            const sentMessages = Message.messages.filter((result)=>{
                                         return result.senderId === parseInt(id);
                                     });
            if(sentMessages.length > 0){
                  const getName = usersList.get(parseInt(id));
                   res.status(200).send({
                   status : 200,
                   message : `All Sent messages for ${getName.fullName}`,
                   sentmessages : sentMessages
               });
            }else{
                    sendResponse(res,200,"No messages found for user",null);
               }
     }else{
               sendResponse(res,404,null,"Not Found");
         }
 
});


messageRouter.get("/unreadmails/:id", (req,res)=>{
        const {id} = req.params;
        const verifyUser = user.users.filter((result)=>{
               return result.userId === parseInt(id);
    });

      if(verifyUser.length > 0){
            const unreadMessages = Message.messages.filter((result)=>{
                                         return result.receiverId === parseInt(id) && result.status === "unread";
                                     });
            if(unreadMessages.length > 0){
                  const getName = usersList.get(parseInt(id));
                   res.status(200).send({
                   status : 200,
                   message : `All unread messages for ${getName.fullName}`,
                   unreadmessages : unreadMessages
               });
            }else{
                    sendResponse(res,200,"No messages found for user",null);
               }
      }else{
         sendResponse(res,404,null,"Not Found");
      }

});



messageRouter.get("/email/:id", (req,res)=>{
      const {id} = req.params;
      const verifyUser = user.users.filter((result)=>{
               return result.userId === parseInt(id);
    });

       if(verifyUser.length > 0){
             const  getEmail = verifyUser[0].email;
              res.status(200).send({
                   message : "Email found",
                   email : getEmail
              });
       }else{
          sendResponse(res,404,null,"Not Found");
       }
});











module.exports = {
	messageRouter
};