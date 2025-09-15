// test suite
describe("Mocha Hooks Example", () => {
  // All hooks will be present here

  // 1st 
  before(() => {
    // only once
    cy.log("Run once before all tests");
  });

  // 2nd 

  beforeEach(() => {
    // for each test case
    cy.log("Run before each test");
  });


  // 3rd 
  it("Test 1", () => {
    cy.log("Executing Test 1");
  });


  // 4th 
  afterEach(() => {
    // for each test case
    cy.log("Run after each test");
  });






  // before each 

  it("Test 2", () => {
    cy.log("Executing Test 2");
  });


// after each 


  // 5th
  after(() => {
    // only once
    cy.log("Run once after all tests");
  });

});
