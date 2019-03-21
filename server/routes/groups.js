import express from 'express';
import { sendResponse } from "../helpers/responses";
import { verifyToken } from '../helpers/validators';
import {insertGroupTable,insertGroupMembers, getGroups} from "../crud/db";

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



groupRouter.get("/groups", verifyToken, (req,res)=>{
    const {userDetails} = req.body
    const userId = userDetails[0].userid
    getGroups(userId)
    .then((result)=>{
        if(result.length > 0){
           const groupDetails =  result
           sendResponse(res,200,groupDetails,null) 
        }else{
            sendResponse(res,201,'no groups found for user',null)
        }
    }).catch((e)=>{
        sendResponse(res,400,null,'something went wrong')
    })
})








export default groupRouter
