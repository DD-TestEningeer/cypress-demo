


// 1.	By ID → cy.get('#username')
// 2.	By Class → cy.get('.btn')
// 3.	By Attribute → cy.get('[type="submit"]')
// 4.	By Text → cy.contains('Login')


describe("The Locators Demo", ()=>{


    // Test Case 1


    it("Verify the login scenario", ()=>{



        cy.visit("https://practicetestautomation.com/practice-test-login/");


        // 1.	By ID → cy.get('#username')
        cy.get("#username").type("student");

        // 3.	By Attribute → cy.get('[type="submit"]')
        cy.get("[name='password']").type("Password123");

        // 2.	By Class → cy.get('.btn')
        cy.get(".btn").click();

        // 4.	By Text → cy.contains('Login')

        cy.contains("Log out").click;










    });







});