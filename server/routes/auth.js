import express from 'express';
import { validateUserEntry, verifyToken, hashPassword, insertUser } from '../helpers/validators';
import { sendResponse } from '../helpers/responses';
import jwt from "jsonwebtoken"
import insertUsers from '../crud/db'
const authRouter = express.Router();

authRouter.post('/signup', validateUserEntry, (req, res) => {
     const {token} = req
     sendResponse(res, 200,token,null)
    
});



export default authRouter;




