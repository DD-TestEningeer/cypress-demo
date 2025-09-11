// We are going to automate the register module
// url => https://dd-demo-tau.vercel.app/register.html

// step 1 => test suite or test case grouping

describe("Register Page Test Suite", () => {
  // step 2 => we are going to write the actual test cases

  // valid scenario or positive scenario

  it("Verify the user registration with valid details", () => {
    // test steps

    // step 1 => navigate to register page url
    cy.visit("https://dd-demo-tau.vercel.app/register.html");

    // step 2=> Enter the username
    // <input type="text" id="userName" name="userName" required="" autocomplete="off">

    // cssSelector

    // cy.get() => for finding web element with locator
    //  cy.type() => for typing the text to input box

    cy.get("#userName").type("Demouser"); // to find the webelement

    // type the email
    cy.get("#userEmail").type("Test@gmail.Com");

    // type the password

    cy.get("#password").type("Test@123");

    // click on the Register button
    cy.get("button").click();

  });



// invalid scenario or nagative scenario

it("Verify the user registration with invalid details", () => {
    // test steps

    // step 1 => navigate to register page url
    cy.visit("https://dd-demo-tau.vercel.app/register.html");

    // step 2=> Enter the username
    // <input type="text" id="userName" name="userName" required="" autocomplete="off">

    // cssSelector

    // cy.get() => for finding web element with locator
    //  cy.type() => for typing the text to input box

    cy.get("#userName").type("Demouser"); // to find the webelement

    // type the email
    cy.get("#userEmail").type("Test");

    // type the password

    // cy.get("#password").type("");

    // click on the Register button
    cy.contains("Register").click();

  });








});
