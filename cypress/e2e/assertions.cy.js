




describe("Web Automation" , ()=>{


    it("Textbox Test", ()=>{


        cy.log("open the web url");
        cy.visit("https://dd-demo-tau.vercel.app/textbox.html");

        cy.title().should('include', "Text Box Demo");

        cy.url().should('include', "/textbox.html");



        cy.log("Enter the full name");


        // if the element is visible
        cy.contains('Full Name:').should('be.visible');
        // cy.contains('Full Name:').should('be.visible').and('contain', 'Full Name:')


        cy.log("Click on the submit button");
        cy.contains("Submit").should('be.visible');
        cy.contains("Submit").click();



/*

        cy.get("#fullName").type("Dnyaneshwar Divekar");

        cy.log("Enter the email address");
        cy.get("#userEmail").type("demo@gmail.com");

        cy.log("Enter the current address");
        cy.get("#currentAddress").type("India");

        cy.log("Enter the permanentAddress address");
        cy.get("#permanentAddress").type("India");

        cy.log("Click on the submit button");
        cy.contains("Submit").click();

        */

    } );









}





);