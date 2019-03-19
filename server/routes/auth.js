import express from 'express';
import { validateUserEntry, validateUserSignIn } from '../helpers/validators';
import { sendResponse } from '../helpers/responses';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
const authRouter = express.Router();
dotenv.config();

authRouter.post('/signup', validateUserEntry, (req, res) => {
     const {token} = req
     sendResponse(res, 200,token,null)
    
});

authRouter.post('/login', validateUserSignIn, (req,res)=> {
	const {payload} = req;
	const token = jwt.sign(payload, process.env.SECRET_KEY);
	res.header('Authorization', `Bearer ${token}`);
     sendResponse(res,200,token,null)
});



export default authRouter;




