const {isPositiveInteger} = require("../helpers/validators");
const {trimAllSpace} = require("../helpers/validators");
const {filterInput} = require("../helpers/validators");
const expect = require("expect");
// const request = require("supertest");



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