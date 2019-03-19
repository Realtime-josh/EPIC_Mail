import express from 'express';
import { user } from '../models/users';
import { validateUserEntry,validateUserEntryy,verifyToken,insertUser,validateUserSignIn,validateUserSignInn } from '../helpers/validators';
import { sendResponse } from '../helpers/responses';
import jwt from "jsonwebtoken"
import insertUsers from '../crud/db'

const authRouter = express.Router();
const authRouterv2 = express.Router();


authRouter.post('/signup', validateUserEntry, (req, res) => {
  const { contactItem } = req;
  user.users.push(contactItem);
  res.status(200).send({
    status: 200,
    message: 'User successfully created',
    contactItem,
  });
});

authRouter.post('/login', validateUserSignIn, (req, res) => {
  const { accountDetails } = req;
  res.status(200).send({
    status: 200,
    message: 'Successfully Signed In',
    UserDetails: accountDetails,
  });
});


authRouterv2.post('/signup', validateUserEntryy, (req, res) => {
     const {token} = req
     sendResponse(res, 200,token,null)
    
});

authRouterv2.post('/login',validateUserSignInn,verifyToken, (req,res)=> {
  const {payload} = req;
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  res.header('Authorization', `Bearer ${token}`);
        res.status(202).send({
          message: 'successfully logged in',
          token,
        });
});



export {
  authRouter,
  authRouterv2
};
