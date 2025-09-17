describe("Screenshot demo", () => {
  it("Test Case 1: ", () => {
    // open url

    cy.visit("https://www.google.com");

    // capture the full page screenshot

    cy.screenshot("Google Homepage"); 


    // capture specific web element screenshot

    cy.get('.LLD4me').screenshot("Google Logo");


    cy.get('[jsmodel="b5W85 vNzKHd"]').screenshot("Google Search Input");

  });
});
