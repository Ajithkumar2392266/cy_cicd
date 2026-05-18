import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('SauceDemo - Page Object Model Tests', () => {
  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  it.only('should successfully log in with a valid standard user', () => {
    LoginPage.login(users.standardUser.username, users.standardUser.password);
    InventoryPage.verifyProductsPage();
  });

  it('should show an error for a locked-out user', () => {
    LoginPage.login(users.lockedUser.username, users.lockedUser.password);
    LoginPage.verifyErrorMessage('Sorry, this user has been locked out');
  });

  it('should show an error for invalid credentials', () => {
    LoginPage.login(users.invalidUser.username, users.invalidUser.password);
    LoginPage.verifyErrorMessage('Username and password do not match');
  });

  it('should complete a full purchase flow: login → add items → checkout → finish', () => {
    // Step 1: Login
    LoginPage.login(users.standardUser.username, users.standardUser.password);
    InventoryPage.verifyProductsPage();

    // Step 2: Add items to cart
    InventoryPage.addBackpackToCart();
    InventoryPage.addBikeLightToCart();
    InventoryPage.verifyCartBadge(2);

    // Step 3: Open cart
    InventoryPage.openCart();
    CartPage.verifyCartItems(2);
    CartPage.verifyCartItemNames(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    // Step 4: Proceed to checkout
    CartPage.clickCheckout();
    cy.url().should('include', '/checkout-step-one.html');

    // Step 5: Fill in checkout information
    CheckoutPage.fillAndContinue(
      users.checkoutInfo.firstName,
      users.checkoutInfo.lastName,
      users.checkoutInfo.postalCode
    );

    // Step 6: Verify overview page and subtotal
    CheckoutOverviewPage.verifyOverviewPage();
    CheckoutOverviewPage.verifySubtotal();

    // Step 7: Finish purchase
    CheckoutOverviewPage.clickFinish();

    // Step 8: Verify order completion
    CheckoutCompletePage.verifyOrderSuccess();

    // Step 9: Back to home and verify cart is empty
    CheckoutCompletePage.clickBackHome();
    CheckoutCompletePage.verifyCartIsEmpty();
  });

  it('should sort products from high-to-low price', () => {
    LoginPage.login(users.standardUser.username, users.standardUser.password);
    InventoryPage.verifyProductsPage();

    InventoryPage.sortByPriceHighToLow();
    InventoryPage.verifyPricesSortedHighToLow();
  });
});
