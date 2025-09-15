


describe("get and find function Demo", ()=>{


    // test case

    it("Get and Find Locator Test", ()=>{


    // open the page url 
    
    cy.visit("https://practicetestautomation.com/practice-test-login/");


    // Find the child element with .find function


     cy.xpath("//section[@id='main-container']").find("section");   
        



    // parent element => child element
    cy.get("#login").find("h2").should('be.visible');



    });

});