describe("Web Element Interaction Demo", () => {
  // use hook for page navigation

//   before(() => {
//     cy.visit("https://practicetestautomation.com/practice-test-login/");
//   });

  it("Test Case 1 for Input and Button interactios ", () => {


    // open the page url

    cy.visit("https://practicetestautomation.com/practice-test-login/");

    // url validation
    cy.url().should('includes', "practice-test-login/");

    // title validation

    cy.title().should('eq', "Test Login | Practice Test Automation");

    // a) Typing in Input Boxes => sendKeys() in Cypress => cy.get().type()

    // type method for sending data to you input boxes

    cy.get("input[type='text']").type("testUser");

    cy.get("#password").type("demoPass");

    
    // b) Clicking Buttons

    cy.get(".btn").click();


    // c) Checking & Unchecking Checkboxes





  });



  it("Test Case 2 Checkbox interactios ", () => {

    // open the page url    
    cy.visit("https://practice-automation.com/form-fields/");


    // find the checkbox element

    cy.get("#drink3").should('be.visible').check();


    // wait for 5 seconds 

    cy.wait(5000);


    cy.get("#drink3").should('be.visible').uncheck();


    // radio button - check()

    cy.get("#color1").should('be.visible').check();
});


// e) Handling Dropdowns (Static <select>)


it.only("Test Case 3 Dropdown interactios ", () => {

    // open the page url    
    cy.visit("https://practice-automation.com/form-fields/");


    // find the dropdown element

    // Select by visible text
cy.get("#automation").select('Yes');
 

cy.wait(5000);

// Select by value

cy.get("#automation").select('no');


cy.wait(5000);

// Select by index
cy.get("#automation").select(3);

    
});



});