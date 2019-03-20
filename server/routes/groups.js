import express from 'express';
import { sendResponse } from "../helpers/responses";
import { verifyToken } from '../helpers/validators';
import {insertGroupTable,insertGroupMembers} from "../crud/db";

const groupRouter = express.Router();


groupRouter.post("/groups", verifyToken, (req,res)=>{
    const {userDetails, groupName,role} = req.body;
    const userId = userDetails[0].userid;
    insertGroupTable(groupName,role,userId)
    .then(()=>{
        sendResponse(res,200,'Group created', null)
    }).catch((e)=>{
        sendResponse(res, 404, null, 'unable to process this request')
    })  
});












export default groupRouter
