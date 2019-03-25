import validator from 'validator';
import { user } from '../models/users';
import { usersList } from '../models/users';
import { mapMessages } from '../models/messages';
import { Message } from '../models/messages';
import { sendResponse } from './responses';
import  jwt  from 'jsonwebtoken'
import { getUserEmail, insertUsers } from '../crud/db'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';

dotenv.config();
// let connectionString = process.env.DATABASE_URL;


const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);

const filterInput = (input) => {
  const pattern = /[~!#$%^&*()+={}:'"<>?;',]/;
  const result = pattern.test(input);
  return result;
};

const trimAllSpace = str => str.replace(/\s+/g, '');

const atEpicMail = (input) => {
  const result = input.match(/@epicmail.com/g)
  if(result === null){
    return false;
  }else if(result.length > 0){
    return true;
  }
};


const validateUserEntry = (req, res, next) => {
  const {
    email, firstName, lastName, password,
  } = req.body;

  const contactItem = { contact: [] };
  const trimFirstName = trimAllSpace(firstName);
  const trimLastName = trimAllSpace(lastName);
  const trimEmail = trimAllSpace(email);

  if (validator.isEmail(email) && !filterInput(trimFirstName) && trimFirstName.length > 2
        && !filterInput(trimLastName) && trimLastName.length > 2
		&& !filterInput(trimEmail) && password.length > 6) {
    const checkEmail = user.users.filter(result => result.email === email);
    if (checkEmail.length < 1) {
      contactItem.userId = user.lastUserId + 1;
      user.lastUserId += 1;
      contactItem.firstName = trimFirstName;
      contactItem.lastName = trimLastName;
      contactItem.password = password;
      contactItem.email = email;
      contactItem.fullName = `${trimFirstName } ${trimLastName}`;
      usersList.set(String(contactItem.userId), contactItem);
      req.contactItem = contactItem;
      next();
    } else {
      sendResponse(res, 400, null, 'email already exist.');
    }
  } else {
    sendResponse(res, 400, null, 'Ensure username, email and password are valid entries');
  }
};


const validateUserSignIn = (req, res, next) => {
  const { email, password } = req.body;
  const trimEmail = trimAllSpace(email);
  if (validator.isEmail(email) && !filterInput(trimEmail) && password.length > 6) {
    const checkEmail = user.users.filter(result => result.email === email);

    if (checkEmail.length > 0 && checkEmail[0].password === password) {
      req.accountDetails = checkEmail[0];
      next();
    } else {
      sendResponse(res, 400, null, 'email and password is not associated with a registered account');
    }
  } else {
    sendResponse(res, 400, null, 'Ensure email and password are valid entries');
  }
};


const createMessage = (req, res, next) => {
  const {
    senderId, receiverId, subject, message, status,
  } = req.body;
  
  const verifyUsersExist = user.users.filter(result => (result.userId === senderId || result.userId === receiverId));

  const verifyParentMessage = Message.messages.filter(result => (result.senderId === senderId && result.receiverId === receiverId) 
                || (result.senderId === receiverId && result.receiverId === senderId));


  if (verifyUsersExist.length > 1) {
    if (verifyParentMessage.length > 0) {
      const getParentMessage = verifyParentMessage[0].parentMessageId;
      const messageDetails = {
        messageId: Message.lastMessageId + 1,
        senderId,
        receiverId,
        parentMessageId: getParentMessage,
        subject,
        message,
        status,
        createdOn: new Date(),
      };
      Message.lastMessageId += 1;
      mapMessages.set(String(messageDetails.messageId), messageDetails);
      req.messageDetails = messageDetails;
      next();
    } else {
      const createParentMessageId = Message.lastParentMessageId + 1;
      const messageDetails = {
        messageId: Message.lastMessageId + 1,
        senderId,
        receiverId,
        parentMessageId: createParentMessageId,
        subject,
        message,
        status,
        createdOn: new Date(),
      };
      Message.lastMessageId += 1;
      Message.lastParentMessageId += 1;
      mapMessages.set(String(messageDetails.messageId), messageDetails);
      req.messageDetails = messageDetails;
      next();
    }
  } else {
    sendResponse(res, 401, null, 'one or more users is not registered');
  }
};

// createMessage();


const validateUserEntryy = (req, res, next) => {
  const {
    email, firstName, lastName, password,
  } = req.body;

  if(typeof email === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined' || 
    typeof password === 'undefined'){
    sendResponse(res, 400, null, "Ensure that all fields are correctly filled out")
  }else{
      const trimFirstName = trimAllSpace(firstName);
      const trimLastName = trimAllSpace(lastName);
      const trimEmail = trimAllSpace(email);
        if (validator.isEmail(email) && atEpicMail(trimEmail) && !filterInput(trimFirstName) && trimFirstName.length > 2
    && !filterInput(trimLastName) && trimLastName.length > 2
    && !filterInput(trimEmail) && password.length > 6) {
    const {firstName, lastName, email, password} = req.body;
    const payload = {
      firstName,
      lastName,
      email
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    req.token = token;
    getUserEmail(email)
   .then((result)=>{
      if(result.length > 0){
          sendResponse(res, 400, null, 'Not allowed to sign up');
      }else{
         const hashedPassword = bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password,salt,(err,hash) =>{
              insertUsers(firstName,lastName,email,hash,token);
              next();
            })
         });
         
      }
   }).catch((err)=>{
      res.send(err);
   });
        
    } else {
      sendResponse(res, 400, null, 'Ensure username, email and password are valid entries');
    }
  }

} 




const validateUserSignInn = (req, res, next) => {
  const { email, password } = req.body;
  if(typeof email === 'undefined' || typeof password === 'undefined'){
    sendResponse(res,400, null, 'Something went wrong');
  }else{
    const trimEmail = trimAllSpace(email);
    if (validator.isEmail(email) && atEpicMail(trimEmail) && !filterInput(trimEmail) && password.length > 6) {
        getUserEmail(email)
        .then((result)=>{
            bcrypt.compare(password, result[0].password,(err,data)=>{
             if(!data){      
               sendResponse(res, 400, null, 'Password Incorrect');
             }else{
                  const payload = {};
                  payload.userId = result[0].id;
                  payload.firstName = result[0].firstname;
                  payload.lastName  = result[0].lastname;
                  payload.email  = result[0].email
                  req.payload = payload;
                  next();
             }
          })
        }).catch((e)=>{
          sendResponse(res,400, null, "unable to login this user");
        })
    
  } else {
    sendResponse(res, 400, null, 'Ensure email and password are valid entries');
  }
 }
};


const verifyToken = (req, res, next) => {
  const bearerHeader = req.get('Authorization');
  if (typeof bearerHeader !== "undefined") {
    const splitBearerHeader = bearerHeader.split(" ");
    const token = splitBearerHeader[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        sendResponse(res, 400, null, "authentication failed!");
      } else {
        const decrypt = jwt.verify(token, process.env.SECRET_KEY);
        req.body.decrypted = decrypt;
        getUserEmail(req.body.decrypted.email)
          .then((result) => {
            req.body.userDetails = result;
            next();
          })
          .catch(() => {
            // console.log(e);
            sendResponse(res, 403, null, 'Invalid user');
          });

      };
    });

  } else {
    sendResponse(res, 404, null, "Cannot authenticate user")
  }
}

const senderItem = (req, res, next) =>{
  const {receiverEmail, subject, message, status} = req.body
  if(typeof receiverEmail === 'undefined' || typeof subject === 'undefined' || typeof message === 'undefined' ||
    typeof status === 'undefined'){
      sendResponse(res,400,"All fields must be filled out correctly")
  }else{
     const trimEmail = trimAllSpace(receiverEmail);
     if (validator.isEmail(receiverEmail) && atEpicMail(trimEmail) && !filterInput(trimEmail)) {
         getUserEmail(receiverEmail)
         .then((result)=>{
            if(result.length > 0){
              const receiverId = result[0].userid
              req.receiverId = receiverId
              next();
            }else{
              sendResponse(res,404, null, 'could not fetch email')
            };
         }).catch((e)=>{
           sendResponse(res,400, null, "unable to retrieve email");
         });
     }else{
        sendResponse(res,400,null, 'unable process');
     };
  };
}


export {
  isPositiveInteger,
  filterInput,
  trimAllSpace,
  validateUserEntry,
  validateUserEntryy,
  validateUserSignIn,
  validateUserSignInn,
  createMessage,
  atEpicMail,
  verifyToken,
  senderItem
};

