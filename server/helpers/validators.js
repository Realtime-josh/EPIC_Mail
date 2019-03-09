import {user} from "../models/users";
import {usersList} from "../models/users";
import {mapMessages} from "../models/messages";
import {Message} from "../models/messages";
import {sendResponse} from "./responses";
import validator from "validator";


const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);

const filterInput = (input) => {
	const pattern = /[~!#$%^&*()+={}:'"<>?;',]/;
    const result = pattern.test(input);
    return result;
};

const trimAllSpace = (str) =>{
	return str.replace(/\s+/g, "");
};



const validateUserEntry = (req,res,next) => {
	const {email,firstName,lastName,password} = req.body;

	const contactItem = {contact : []};	
	const trimFirstName = trimAllSpace(firstName);
	const trimLastName = trimAllSpace(lastName);
	const trimEmail = trimAllSpace(email);

	if(validator.isEmail(email) && !filterInput(trimFirstName) && trimFirstName.length > 2
        && !filterInput(trimLastName) && trimLastName.length > 2 &&
		!filterInput(trimEmail) && password.length>6){
           let checkEmail = user.users.filter((result)=>{
                  return result.email === email;
           });    
             if(checkEmail.length < 1){
                    contactItem.userId = user.lastUserId + 1;
                    user.lastUserId += 1;
                    contactItem.firstName = trimFirstName;
                    contactItem.lastName = trimLastName;
                    contactItem.password = password;
                    contactItem.email = email;
                    contactItem.fullName = trimFirstName + " " + trimLastName;
                    usersList.set(String(contactItem.userId), contactItem);
                    req.contactItem = contactItem;
                    next();
             }else{
                     sendResponse(res,400,null,"email already exist.");
                }
          
	}else{
		sendResponse(res,400,null,"Ensure username, email and password are valid entries");
	}
};


const validateUserSignIn = (req,res,next) => {
    const {email, password} = req.body; 
    const trimEmail = trimAllSpace(email);
    if(validator.isEmail(email) && !filterInput(trimEmail) && password.length>6){

        const checkEmail = user.users.filter((result)=>{
                  return result.email === email;
           });

        if(checkEmail.length > 0 && checkEmail[0].password === password){
                    req.accountDetails = checkEmail[0];
                    next();
             }else{
                 sendResponse(res,400,null,"email and password is not associated with a registered account");
             }
    }else{
        sendResponse(res,400,null,"Ensure email and password are valid entries");
    }

};



const createMessage = (req,res,next) => {
    const {senderId, receiverId, subject, message, status} = req.body;
    // const senderId = 1;
    // const receiverId =2;
    const verifyUsersExist = user.users.filter((result)=>{
        return (result.userId === senderId || result.userId === receiverId);
    });

    const verifyParentMessage = Message.messages.filter((result)=>{
        return (result.senderId === senderId && result.receiverId === receiverId) || 
                (result.senderId === receiverId && result.receiverId === senderId);
    });


    if(verifyUsersExist.length > 1){
            if(verifyParentMessage.length > 0){
                 const getParentMessage = verifyParentMessage[0].parentMessageId;
                 const messageDetails = {
                             messageId : Message.lastMessageId + 1,
                             senderId : senderId,
                             receiverId : receiverId,
                             parentMessageId : getParentMessage,
                             subject : subject,
                             message : message,
                             status : status,
                             createdOn : new Date()
                 };
                  Message.lastMessageId += 1;
                  mapMessages.set(String(messageDetails.messageId),messageDetails);
                  req.messageDetails = messageDetails;
                  next();
            }else{
                        const createParentMessageId = Message.lastParentMessageId + 1;
                        const messageDetails = {
                                 messageId : Message.lastMessageId + 1,
                                 senderId : senderId,
                                 receiverId : receiverId,
                                 parentMessageId : createParentMessageId,
                                 subject : subject,
                                 message : message,
                                 status : status,
                                 createdOn : new Date()
                     };
                       Message.lastMessageId += 1;
                       Message.lastParentMessageId += 1;
                       mapMessages.set(String(messageDetails.messageId),messageDetails);
                      req.messageDetails = messageDetails;
                      next();
               }
          }else{
                sendResponse(res,401,null,"one or more users is not registered");
       }
    

};

// createMessage();







export {
	isPositiveInteger,
	filterInput,
	trimAllSpace,
	validateUserEntry,
    validateUserSignIn,
    createMessage
};