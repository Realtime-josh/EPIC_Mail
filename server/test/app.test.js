const {app} = require("../app");
const expect = require("expect");
const request = require("supertest");


describe("GET /", ()=>{
  it("should respond with welcome message", ()=>{
    request(app)
    .get("/")
    .set("Accept", "application/json")
    .expect(200)
    .then((response)=>{
      expect(response.body.message).toContain("Welcome");
    });

  });
});


describe("*", () => {
  it("should respond with error message", ()=>{
    request(app)
    .get("/noroute")
    .set("Accept", "application/json")
    .expect(404)
    .then((response)=>{
      expect(response.body.error).toContain("Invalid");
    });
  });
});


describe("POST /signup route", ()=>{
   it("should successfully create user", (done)=>{
       request(app)
       .post("/api/v1/createaccount")
       .send({
                  "email" : "kellyfeller@gmail.com",
                  "firstName" : "Kelly",
                  "lastName" : "Feller",
                  "password" : "jddhehndhr"               
       })
       .set("Accept", "application/json")
       .expect(200)
       .expect("Content-type", /json/)
       .end((err,res)=>{
          if(err) done(err);
             expect(res.body.message).toContain("User successfully created");
             expect(res.body.status).toBe(200);
       });
       done();
   });
});



