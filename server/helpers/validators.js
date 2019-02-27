const {user} = require("../models/users");
const {usersList} = require("../models/users");
const {sendResponse} = require("./responses");
const validator = require("validator");


const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);

const filterInput = (input) => {
	const pattern = /[~!#$%^&*()+={}:'"<>?;',]/;
    const result = pattern.test(input);
    return result;
};

const trimAllSpace = (str) =>{
	return str.replace(/\s+/g, "");
};



const validateUserEntry = (req,res,next) => {
	const {email,firstName,lastName,password} = req.body;

	const contactItem = {contact : []};	
	const trimFirstName = trimAllSpace(firstName);
	const trimLastName = trimAllSpace(lastName);
	const trimEmail = trimAllSpace(email);

	if(validator.isEmail(email) && !filterInput(trimFirstName) && trimFirstName.length > 2
        && !filterInput(trimLastName) && trimLastName.length > 2 &&
		!filterInput(trimEmail) && password.length>6){
           let checkEmail = user.users.filter((result)=>{
                  return result.email === email;
           });    
             if(checkEmail.length < 1){
                    contactItem.userId = user.lastUserId + 1;
                    user.lastUserId += 1;
                    contactItem.firstName = trimFirstName;
                    contactItem.lastName = trimLastName;
                    contactItem.password = password;
                    contactItem.email = email;
                    contactItem.fullName = trimFirstName + " " + trimLastName;
                    usersList.set(String(contactItem.userId), contactItem);
                    req.contactItem = contactItem;
                    next();
             }else{
                     sendResponse(res,400,null,"email already exist.");
                }
          
	}else{
		sendResponse(res,400,null,"Ensure username, email and password are valid entries");
	}
};







module.exports = {
	isPositiveInteger,
	filterInput,
	trimAllSpace,
	validateUserEntry
};