const {isPositiveInteger} = require("../helpers/validators");
const {trimAllSpace} = require("../helpers/validators");
const {filterInput} = require("../helpers/validators");
const expect = require("expect");
const request = require("supertest");
const {app} = require("../app");
const reqp = require('request-promise');



describe("function tests", ()=>{
   it("should return a positive number", ()=>{
         const res = isPositiveInteger(2);
         const les = isPositiveInteger(1.09);
         const bless = isPositiveInteger(-3);
         const guess = isPositiveInteger("3");
         expect(res).toBe(true);
         expect(les).toBe(false);
         expect(bless).toBe(false);
         expect(guess).toBe(true);
              
   });


   it("should trim all white spaces", ()=>{
         const res = trimAllSpace("  kelvin    ");
         const les = trimAllSpace("ma  r k ");
         const bless = trimAllSpace("  j a  k  e");
         const guess = trimAllSpace("Cla rke");
         expect(res).toBe("kelvin");
         expect(les).toBe("mark");
         expect(bless).toBe("jake");
         expect(guess).toBe("Clarke");
              
   });

   it("should flag special characters", ()=>{
         const firstCheck = filterInput("ke   lvin    %");
         const secondCheck = filterInput("ma  & r k ");
         const thridCheck = filterInput("  j a <  k  e");
         const fourthCheck = filterInput("Cla ~rke");
         expect(firstCheck).toBe(true);
         expect(secondCheck).toBe(true);
         expect(thridCheck).toBe(true);
         expect(fourthCheck).toBe(true);
              
   });

});



describe("middlewares for routes", ()=>{
   it("should return error if user has already signed up", (done) => {
        request(app)
          .post("/api/v1/createaccount")
          .send({"email" : "franksonjoshua@gmail.com",
                  "firstName" : "Joshua",
                  "lastName" : "Frankson",
                  "password" : "jddhehndhr" })
          .set("Accept", "application/json")
          .expect(400)
          .expect("Content-Type", /json/)
          .end((err, res) => {
            if (err) done(err);
            expect(res.body.error).toContain("email already exist.");
            expect(res.body.status).toBe(400);

         });
          done();
      });

      it("should check email validity", (done) =>{
        request(app)
       .post("/api/v1/createaccount")
       .send({
                 "email" : "frankson#$%joshua@gmail.com",
                  "firstName" : "Joshua",
                  "lastName" : "Frankson",
                  "password" : "jddhehndhr"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure username, email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
    done();
});

   
   it("should check firstName validity", (done) =>{
        request(app)
       .post("/api/v1/createaccount")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "firstName" : "Joshu%^$#@a",
                  "lastName" : "Frankson",
                  "password" : "jddhehndhr"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure username, email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
    done();
});


   it("should check lastName validity", (done) =>{
        request(app)
       .post("/api/v1/createaccount")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "firstName" : "Joshua",
                  "lastName" : "Fra$%#@nkson",
                  "password" : "jddhehndhr"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure username, email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
    done();
});

   it("should check password length is greater than 6", (done) =>{
        request(app)
       .post("/api/v1/createaccount")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "firstName" : "Joshua",
                  "lastName" : "Frankson",
                  "password" : "jddhe"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure username, email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
    done();
});


    it("should return length of first name greater than 1", (done) =>{
        request(app)
       .post("/api/v1/createaccount")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "firstName" : " ",
                  "lastName" : "Frankson",
                  "password" : "jddhe"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure username, email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
    done();
});

  it("should return length of lastName greater than 1", (done) =>{
        request(app)
       .post("/api/v1/createaccount")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "firstName" : "Joshua",
                  "lastName" : " ",
                  "password" : "jddhe"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure username, email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
    done();
});

  it("should not return withspaces in names", (done) =>{
        request(app)
       .post("/api/v1/createaccount")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "firstName" : "     ",
                  "lastName" : " ",
                  "password" : "jddhert"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure username, email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
     done();
  });


  it("should return error for an unregistered email account", (done) =>{
        request(app)
       .post("/api/v1/signin")
       .send({
                 "email" : "franksonjos@gmail.com",
                  "password" : "yettiyea"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("email and password is not associated with a registered account");
      expect(res.body.status).toBe(400);
    });
     done();
  });

   it("should return error for an invalid email address", (done) =>{
        request(app)
       .post("/api/v1/signin")
       .send({
                 "email" : "frankson$%#@jos@gmail.com",
                  "password" : "yettiyea"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
     done();
  });

   it("should return error for a wrong password", (done) =>{
        request(app)
       .post("/api/v1/signin")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "password" : "yettdhtes"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("email and password is not associated with a registered account");
      expect(res.body.status).toBe(400);
    });
     done();
  });

   it("should return error for an invalid password length", (done) =>{
        request(app)
       .post("/api/v1/signin")
       .send({
                 "email" : "franksonjoshua@gmail.com",
                  "password" : "yet"
       })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err,res)=>{
      if(err) done(err);
      expect(res.body.error).toContain("Ensure email and password are valid entries");
      expect(res.body.status).toBe(400);
    });
     done();
  });



});













