describe("Web Page Navigate", () => {
  it("Test Case 1 - Page Navigation", () => {
    // homepage webiste
    cy.visit("https://practicetestautomation.com/");

    cy.wait(5000);

    // Click on the Practice link

    cy.contains("Practice").click();

    cy.wait(5000);

    // Navigate to back url

    cy.go("back");

    cy.wait(5000);

    // Navigate forward

    cy.go("forward");

    // Page refresh 

    cy.reload();
  });
});
