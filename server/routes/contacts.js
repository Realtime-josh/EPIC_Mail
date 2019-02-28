const {validateUserEntry} = require("../helpers/validators");
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

contactRouter.post("/signin",validateUserSignIn, (req,res)=>{
      const {accountDetails} = req;
      res.status(200).send({
      status : 200,
      message : "Scuccessfully Signed In",
      UserDetails : accountDetails
      });
});









module.exports = {
contactRouter
};