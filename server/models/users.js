
const user = {

      users : [
                {
                    userId : 1,
                    email : "franksonjoshua@gmail.com",
                    firstName : "Joshua",
                    lastName :  "Frankson",
                    fullName : "Joshua Frankson",
                    password  : "yettiyea",

  
       contacts : [
                         {
                             id : 1,
                             email : "candreva@gmail.com",
                             firstName : "Candreva",
                             lastName :  "Rodriguez",
                             fullName : "Joshua Frankson"

                         }
                   ],

                      lastContactId : 1
              }


         ],
 
              lastUserId : 1

};

const usersList = new Map();
user.users.forEach((contactItem)=>{
	usersList.set(contactItem.userId, contactItem);
});



module.exports = {
  user,
  usersList
};
