// Locator Strategies in Cypress

describe("Locators Demo", () => {
  it("test case 1", () => {
    cy.visit("https://selectorshub.com/xpath-practice-page/");

    //By ID Selector
    // cy.get("#shub63").type("test@gmail.com");

    // By Class Selector

    cy.get(".userform").should("be.visible");

    // By Tag Selector

    // cy.get("unique_tag").should("be.visible");

    // By Attribute Selector

    cy.get("input[placeholder='Enter your company']").should("be.visible");

    // By Text Content (cy.contains)

    // cy.contains("Login").should("be.visible");

    //Chained Locators (Parent → Child)

    cy.get(".userform").find("label").should("be.visible");
  });
});
