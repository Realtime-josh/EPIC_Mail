const expect = require("expect");
const request = require("supertest");
const {app} = require("../app");



describe("GET /receivedmessages", ()=>{
  it("should respond with all received messages", ()=>{
    request(app)
    .get("/api/v1/message/receivedmessages/2")
    .set("Accept", "application/json")
    .expect(200)
    .then((response)=>{
      expect(response.body.message).toContain("All received messages for Sally Marcus");
    });

  });

   it("should respond with all received messages", ()=>{
    request(app)
    .get("/api/v1/message/receivedmessages/1")
    .set("Accept", "application/json")
    .expect(200)
    .then((response)=>{
      expect(response.body.message).toContain("No messages found for user");
    });

  });


});
        

 
  

