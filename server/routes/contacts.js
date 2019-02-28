const {validateUserEntry} = require("../helpers/validators");
const {sendResponse} = require("../helpers/responses");
const {user} = require("../models/users");
const {validateUserSignIn} = require("../helpers/validators");
const express = require("express");
const contactRouter = express.Router();




contactRouter.post("/createaccount",validateUserEntry, (req, res)=>{
     const {contactItem} = req;
     user.users.push(contactItem);
     res.status(200).send({
           status : 200,
           message : "User successfully created",
           contactItem : contactItem
     });

});

contactRouter.post("/signin", (req,res)=>{

})









module.exports = {
contactRouter
};