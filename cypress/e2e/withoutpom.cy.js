/// <reference types="cypress" />

/**
 * End-to-End tests for saucedemo.com
 * No Page Object Model — selectors and actions are used directly inside each test
 * so the flow is easy to read top-to-bottom.
 */

describe("SauceDemo - End-to-End Purchase Flow", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('/');
  });

  it("should successfully log in with a valid standard user", { retries: 3}, () => {
    const USER = cy.config('USER');
    const PWD = Cypress.env('PWD');

    cy.get('[data-test="username"]').type(USER);
    cy.get('[data-test="password"]').type(PWD);
    cy.get('[data-test="login-button"]').click();

    // Assert we landed on the inventory page
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("have.text", "Products");
    cy.get('[data-test="inventory-item"]').should("have.length", 6);
  });

  it("should show an error for a locked-out user", () => {
    cy.get('[data-test="username"]').type(users.lockedUser.username);
    cy.get('[data-test="password"]').type(users.lockedUser.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Sorry, this user has been locked out");
  });

  it("should show an error for invalid credentials", () => {
    cy.get('[data-test="username"]').type(users.invalidUser.username);
    cy.get('[data-test="password"]').type(users.invalidUser.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match");
  });

  it("should complete a full purchase flow: login → add items → checkout → finish", () => {
    // ---------- Step 1: Login ----------
    cy.get('[data-test="username"]').type(users.standardUser.username);
    cy.get('[data-test="password"]').type(users.standardUser.password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    // ---------- Step 2: Add two products to the cart ----------
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // The cart badge should reflect 2 items
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    // ---------- Step 3: Open the cart ----------
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item"]').should("have.length", 2);
    cy.get('[data-test="inventory-item-name"]').then(($items) => {
      const names = [...$items].map((el) => el.innerText);
      expect(names).to.include("Sauce Labs Backpack");
      expect(names).to.include("Sauce Labs Bike Light");
    });

    // ---------- Step 4: Proceed to checkout ----------
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");

    // ---------- Step 5: Fill in checkout information ----------
    cy.get('[data-test="firstName"]').type(users.checkoutInfo.firstName);
    cy.get('[data-test="lastName"]').type(users.checkoutInfo.lastName);
    cy.get('[data-test="postalCode"]').type(users.checkoutInfo.postalCode);
    cy.get('[data-test="continue"]').click();

    // ---------- Step 6: Review order on the overview page ----------
    cy.url().should("include", "/checkout-step-two.html");
    cy.get('[data-test="inventory-item"]').should("have.length", 2);

    // Validate item total against the sum of individual prices
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const sum = [...$prices].reduce(
        (acc, el) => acc + parseFloat(el.innerText.replace("$", "")),
        0
      );

      cy.get('[data-test="subtotal-label"]')
        .invoke("text")
        .then((subtotalText) => {
          const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));
          expect(subtotal).to.equal(sum);
        });
    });

    // ---------- Step 7: Finish the purchase ----------
    cy.get('[data-test="finish"]').click();
    

    // ---------- Step 8: Verify confirmation ----------
    cy.url().should("include", "/checkout-complete.html");
    cy.get('[data-test="complete-header"]').should(
      "have.text",
      "Thank you for your order!"
    );
    cy.get('[data-test="complete-text"]').should("be.visible");

    // ---------- Step 9: Back to home and confirm cart is empty ----------
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
  });

  it("should sort products from high-to-low price", () => {
    cy.get('[data-test="username"]').type(users.standardUser.username);
    cy.get('[data-test="password"]').type(users.standardUser.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="product-sort-container"]').select("hilo");

    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [...$prices].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sortedDesc = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedDesc);
    });
  });
});
