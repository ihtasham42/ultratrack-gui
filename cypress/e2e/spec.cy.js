import { describe, it } from "vitest";
import { cy } from "cypress";

describe("My First Test", () => {
  it("Visits the React app", () => {
    cy.visit("/");
    cy.contains("Welcome to Your React App");
  });
});
