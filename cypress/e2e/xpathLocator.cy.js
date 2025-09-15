




describe("xpath Locator Demo", ()=>{


    // test case

    it("Find element by xpath", ()=>{


    // open the page url 
    
    cy.visit("https://practicetestautomation.com/practice-test-login/");

    // enter the username 

    cy.xpath("//input[@name='username']").type("student");

    // enter the password

    cy.xpath("//input[@name='password']").type("Password123");


    // click on the login button

    cy.xpath("//button[@id='submit']").click();







    }



    );





});