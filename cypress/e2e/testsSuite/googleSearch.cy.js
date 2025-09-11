




describe( "Google Test Suite ", ()=>


{


it("open the google url and search the keyword", ()=>{

    cy.log("Navigate to the google url");
    cy.visit("https://www.google.com");

    cy.log("Find the searchbox and type keyword");
    cy.get("#APjFqb").type("Cypress Framework");


}





);






}




);