import express from 'express';
import { validateUserEntry, validateUserSignIn } from '../helpers/validators';
import { sendResponse } from '../helpers/responses';
import jwt from "jsonwebtoken"
const messageRouter = express.Router();


messageRouter.post('/messages', (req,res)=>{

})
