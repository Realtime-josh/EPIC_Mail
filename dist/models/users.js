"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var user = {

      users: [{
            userId: 1,
            email: "franksonjoshua@gmail.com",
            firstName: "Joshua",
            lastName: "Frankson",
            fullName: "Joshua Frankson",
            password: "yettiyea",

            contacts: [{
                  id: 1,
                  email: "candreva@gmail.com",
                  firstName: "Candreva",
                  lastName: "Rodriguez",
                  fullName: "Joshua Frankson"

            }],

            lastContactId: 1
      }, {
            userId: 2,
            email: "sall@gmail.com",
            firstName: "Sally",
            lastName: "Marcus",
            fullName: "Sally Marcus",
            password: "yettiyea",

            contacts: [{
                  id: 1,
                  email: "candreva@gmail.com",
                  firstName: "Candreva",
                  lastName: "Rodriguez",
                  fullName: "Joshua Frankson"

            }],

            lastContactId: 1
      }, {
            userId: 3,
            email: "ben@gmail.com",
            firstName: "Ben",
            lastName: "Marcus",
            fullName: "Ben Marcus",
            password: "yettiyea",

            contacts: [{
                  id: 1,
                  email: "candreva@gmail.com",
                  firstName: "Candreva",
                  lastName: "Rodriguez",
                  fullName: "Joshua Frankson"

            }],

            lastContactId: 1
      }],

      lastUserId: 3

};

var usersList = new Map();
user.users.forEach(function (contactItem) {
      usersList.set(contactItem.userId, contactItem);
});

// console.log(usersList)


exports.user = user;
exports.usersList = usersList;
//# sourceMappingURL=users.js.map