const {user} = require("../models/users");
const {usersList} = require("../models/users");
const {sendResponse} require("./responses");


const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);

const filterInput = (input) => {
	const pattern = /[~!#$%^&*()+={}:'"<>?;',]/;
    const result = pattern.test(input);
    return result;
};

const trimAllSpace = (str) =>{
	return str.replace(/\s+/g, "");
};






module.exports = {
	isPositiveInteger,
	filterInput,
	trimAllSpace
};