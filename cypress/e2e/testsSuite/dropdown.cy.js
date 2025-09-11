

// https://the-internet.herokuapp.com/dropdown


describe("Dropdown Suite", ()=> {



    it("Select Option 1", ()=>{



        cy.visit("https://the-internet.herokuapp.com/dropdown");

        cy.get('#dropdown').select('Option 1').should('have.value', '1');
        // cy.get('#dropdown').select('Option 1');





    });


    
    it("Select Option 2", ()=>{



        cy.visit("https://the-internet.herokuapp.com/dropdown");

        cy.get('#dropdown').select('Option 2').should('have.value', '2');

        // cy.get('#dropdown').select('Option 2');





    });



});