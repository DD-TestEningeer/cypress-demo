describe("Login Test Suite", () => {
  // positive test case

  it("Verify login with valid test data", () => {
    cy.log("Opening the web url........");
    cy.visit("https://dd-demo-tau.vercel.app/login.html");

    cy.url().should("eq", "https://dd-demo-tau.vercel.app/login.html");
    cy.url().should("includes", "/login.html");

    cy.title().should("eq", "Login Page");

    cy.contains("Login Page").should("contain", "Login Page");

    cy.contains("Email/Username:").should("be.visible");

    cy.get("#username").should("be.visible").type("DemoUser");

    cy.get("#password").should("be.visible").type("TestPassword");

    cy.contains("Login").should("be.visible").click();
  });



  it("Verify the login with invalid test data", ()=>{



     cy.visit("https://practicetestautomation.com/practice-test-login/");


     cy.get("#username").should('be.visible').type("dummyUser");

     cy.get("#password").should('be.visible').type("dummyPassword");


     cy.get("#submit").should('be.visible').click();

     cy.get("#error").should('be.visible').and('contain', "Your username is invalid!");





  });



});
