describe("login with valid credential", () => {
  it("login web url", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );

    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");


    // cy.get("//input[@name='username']").type("Admin");
    // cy.get("//input[@name='password']").type("admin123");


    cy.contains(" Login ").click();
    // cy.get('.oxd-button').click();
  });
});
