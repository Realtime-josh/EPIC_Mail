
filterInput = (input) => {
	const pattern = /[~!#$%^&*()+={}:'"<>?;',]/
    const result = pattern.test(input);
    return result
};

emailSigns = (input) => {
	const pattern = /[@.]/
	const result = pattern.test(input);
	return result;
};

emailSignage = (input) => {
  const pattern = /\b[.com]/
  const result = pattern.test(input);
  return result;
};


whiteSpace = (input) =>{
	const pattern = /[\s]/
	const result = pattern.test(input);
	return result;
}

passwordStrong = (input) => {
	const pattern = /[0-9!@#$%^&*()+_{}|;'<.']/
	const result = pattern.test(input);
	return result;
}



function validateValues(){
   let formDocumentEmail = document.forms["loginForm"]["email"].value;
   let formDocumentPassword = document.forms["loginForm"]["password"].value;
   let formDocumentTrim = formDocumentEmail.trim();
   if(formDocumentTrim == ""){
   	document.getElementById("emailSpan").innerHTML = "Email must be filled out";
   	return false;
   }else if(whiteSpace(formDocumentTrim)){
   	document.getElementById("emailSpan").innerHTML = "Email must not include spaces";
   	return false;
   }else if(formDocumentTrim.length <= 5){
   	document.getElementById("emailSpan").innerHTML = "Please enter valid email address";
   	return false;
   }else if(filterInput(formDocumentTrim)){
   	document.getElementById("emailSpan").innerHTML = "Special characters are not allowed";
   	return false;
   }else if(!emailSigns(formDocumentTrim) || !emailSignage(formDocumentTrim)){
   		document.getElementById("emailSpan").innerHTML = "Invalid Email";
   	    return false;
   }else if(!passwordStrong(formDocumentPassword)){
     	document.getElementById("passwordSpan").innerHTML = "Password must contain at least one number and a special character";
   	    return false;
   }else if(formDocumentPassword.length < 6){
   	    document.getElementById("passwordSpan").innerHTML = "Password must not be less than 6 characters";
   	    return false;
   }else{
   	return true;
   }

}


function validateValuesSignUp(){
   let formDocumentEmail = document.forms["signupForm"]["signupEmail"].value;
   let formDocumentPassword = document.forms["signupForm"]["signupPassword"].value;
   let formDocumentConfirmPassword = document.forms["signupForm"]["confirmPassword"].value;
   let formDocumentNameFirstName = document.forms["signupForm"]["firstNameText"].value;
   let formDocumentNameLastName = document.forms["signupForm"]["lastNameText"].value;
   let formDocumentTrimEmail = formDocumentEmail.trim();


   if(formDocumentTrimEmail == ""){
      document.getElementById("spanEmail").innerHTML = "Email must be filled out";
      return false;
   }else if(whiteSpace(formDocumentTrimEmail)){
      document.getElementById("spanEmail").innerHTML = "Email must not include spaces";
      return false;
   }else if(whiteSpace(formDocumentNameFirstName)){
       document.getElementById("NameSpan").innerHTML = "First name must not include spaces";
      return false;
   }else if(whiteSpace(formDocumentNameLastName)){
        document.getElementById("spanName").innerHTML = "Last name must not include spaces";
        return false;
   }else if(formDocumentTrimEmail.length <= 5){
      document.getElementById("spanEmail").innerHTML = "Please enter valid email address";
      return false;
   }else if(filterInput(formDocumentTrimEmail)){
      document.getElementById("spanEmail").innerHTML = "Special characters are not allowed";
      return false;
   }else if(!emailSigns(formDocumentTrimEmail) || !emailSignage(formDocumentTrimEmail)){
         document.getElementById("spanEmail").innerHTML = "Invalid Email";
          return false;
   }else if(!passwordStrong(formDocumentPassword)){
      document.getElementById("spanPassword").innerHTML = "Password must contain at least one number and a special character";
          return false;
   }else if(formDocumentPassword.length < 6){
          document.getElementById("passwordSpan").innerHTML = "Password must not be less than 6 characters";
          return false;
   }else if(formDocumentPassword !== formDocumentConfirmPassword){
         document.getElementById("spanConfirmPassword").innerHTML = "Password does not match";
          return false;
   }else{
      return true;
   }

}




