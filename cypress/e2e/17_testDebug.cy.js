


// test suite for registration module 
describe("Form Registration", () => {


    it("Verify the form registration was successful", () => {
      cy.visit("https://demoqa.com/automation-practice-form");
  
      // css select with id
      cy.get("#firstName").type("Sangeetha");
      cy.get("#lastName").type("Mohanachandran");
      cy.get("#userEmail").type("abc@gmail.com");
  
      // Select Gender (label click OR force check)
      cy.get('label[for="gender-radio-2"]').check();
  
      cy.get("#userNumber").type("1234567890");
  
      // Date of Birth
      cy.get("#dateOfBirthInput").clear().type("14 Sep 1989{enter}");
  
      // Subject
      cy.get("#subjectsInput").type("QA Testing{enter}");
  
      // Hobbies
      cy.get("#hobbies-checkbox-3").check({ force: true });
  
      cy.get("#currentAddress").type("Milton Keynes");
  
      // State & City (custom dropdowns)
      cy.get("#state").click();
      cy.contains("div", "Rajasthan").click();
  
      cy.get("#city").click();
    //   cy.contains("div", "Jaipur")


    });

    
});