import express from 'express';
import { validateUserEntry } from '../helpers/validators';
import { user } from '../models/users';
import { validateUserSignIn } from '../helpers/validators';


const authRouter = express.Router();


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
    message: 'Scuccessfully Signed In',
    UserDetails: accountDetails,
  });
});


export {
  authRouter,
};
