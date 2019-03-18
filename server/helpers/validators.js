import validator from 'validator';;
import { sendResponse } from './responses';
import { getEmail, insertUsers } from '../crud/db'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
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

  if(email === undefined || firstName === undefined || lastName === undefined || password === undefined){
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
    getEmail(email)
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




const validateUserSignIn = (req, res, next) => {
  const { email, password } = req.body;
  if(typeof email === undefined && typeof password === undefined){
    sendResponse(res,400, null, 'Something went wrong');
  }else{
    const trimEmail = trimAllSpace(email);
    if (validator.isEmail(email) && atEpicMail(trimEmail) && !filterInput(trimEmail) && password.length > 6) {
        getEmail(email)
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




//FORMAT OF TOKEN
//Authorizarion: Bearer <access_token>

//verify Token
const verifyToken = (req, res, next) => {
  //Get auth header value
  const bearerHeader = req.headers['authorization'];

  //check if bearer header is undefined
  if(typeof bearerHeader !== undefined){
     //Split at the space
     const bearer = bearerHeader.split(' ');

     //Get token from array
     const bearerToken = bearer[1];

     //Set the token
     req.token = bearerToken;

     //Next middleware
     next();
  }else{
    sendResponse(res,404 ,null, 'forbidden');
  }
}



export {
  isPositiveInteger,filterInput,trimAllSpace,validateUserEntry,validateUserSignIn,verifyToken,atEpicMail};
