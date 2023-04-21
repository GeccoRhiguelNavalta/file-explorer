import type {} from "cypress";

describe("renders the page correctly", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:3000");
  });
});

describe("should show elements on window", () => {
  it("successfully render h1", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("exist");
  });
});
