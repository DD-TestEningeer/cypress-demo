



describe("Get page title", ()=>{




    // passing test

    it("1) validate the page title", ()=> {


        // Expected Title => "Test Login | Practice Test Automation"

        cy.visit("https://practicetestautomation.com/practice-test-login/");

        cy.title().should('eq', "Test Login | Practice Test Automation");


    });



    // failing test

    it("2) validate the page title", ()=> {


        // Expected Title => "Test Login | Practice Test Automation"

        cy.visit("https://practicetestautomation.com/practice-test-login/");

        cy.title().should('eq', " ABC Practice Test Automation");


    });

} 




);