import { App } from '../support/pageObjects/app';
import { puppies } from '../fixtures/puppies';
import { userDetails } from '../fixtures/userDetails';
import { cartAdditionalProducts } from '../fixtures/cartAdditionalProducts';

const app = new App();
const homePageURL = `${Cypress.config().baseUrl}/`;
const thanksForAdoptionText = 'Thank you for adopting a puppy!';

describe('end-to-end puppy scenarios', () => {
  it('view details for the puppy Hanna, return to the puppy list', () => {
    app.puppyDetailsPage.navigateToPuppyDetailsPage(puppies.hanna);
    app.puppyDetailsPage.verifyPuppyDetails(puppies.hanna);
    app.puppyDetailsPage.adoptionFeeByline.should('be.visible');
    app.puppyDetailsPage.adoptMeButton.should('be.visible');
    app.puppyDetailsPage.returnToListOfPuppiesButton.click();
    cy.url().should('eq', homePageURL);
  });
  it('verify that the puppy Maggie May is on the first page', () => {
    app.open();
    app.puppiesList.verifyPuppyIsVisible(puppies.maggieMae);
  });
  it('verify that the puppy Tipsy is on the second page', () => {
    app.open('/agency?page=2');
    app.puppiesList.verifyPuppyIsVisible(puppies.tipsy);
  });
  it('view the details for Twinkie, and verify that their adoption fee is $22.50', () => {
    app.puppyDetailsPage.navigateToPuppyDetailsPage(puppies.twinkie);
    app.puppyDetailsPage.verifyPuppyDetails(puppies.twinkie);
    app.puppyDetailsPage.verifyAdoptionFeeIsCorrect(puppies.twinkie.adoptFee);
  });
  it('view the details for Spud, click the Adopt Me! button, and then click the change your mind button', () => {
    app.puppyDetailsPage.navigateToPuppyDetailsPage(puppies.spud);
    app.puppyDetailsPage.verifyPuppyDetails(puppies.spud);
    app.puppyDetailsPage.adoptMeButton.click();
    cy.url().should('contain', '/carts');
    app.cart.changeYourMindButton.click();
    cy.url().should('equal', homePageURL);
  });
  it('view the details for Hanna, click the Adopt Me! button, click the Adopt Another Puppy button, and adopt Maggie Mae', () => {
    app.puppyDetailsPage.navigateToPuppyDetailsPage(puppies.hanna);
    app.puppyDetailsPage.verifyPuppyDetails(puppies.hanna);
    app.puppyDetailsPage.adoptMeButton.click();
    cy.url().should('contain', '/carts');
    app.cart.adoptAnotherPuppyButton.click();
    app.puppiesList.viewPuppyDetails(puppies.maggieMae);
    app.puppyDetailsPage.adoptMeButton.click();
    cy.url().should('contain', '/carts');
    app.cart.completeAdoptionButton.click();
    app.adoptionCheckout.submitOrderForm(userDetails, 'Check');
    cy.url().should('equal', homePageURL);
    app.thanksForAdoptionMessage
      .should('be.visible')
      .should('contain', thanksForAdoptionText);
  });
  it('complete the adoption with credit card, and verify the adoption has been completed', () => {
    const targetPuppy = Cypress._.sample(puppies);
    app.puppyDetailsPage.navigateToPuppyDetailsPage(targetPuppy);
    app.puppyDetailsPage.adoptMeButton.click();
    cy.url().should('contain', '/carts');
    app.cart.completeAdoptionButton.click();
    app.adoptionCheckout.submitOrderForm(userDetails, 'Credit card');
    cy.url().should('equal', homePageURL);
    app.thanksForAdoptionMessage
      .should('be.visible')
      .should('contain', thanksForAdoptionText);
  });
  it('adopt Brook, add travel carrier, verify the total amount has increased by the price of the carrier', () => {
    app.puppyDetailsPage.navigateToPuppyDetailsPage(puppies.brook);
    app.puppyDetailsPage.adoptMeButton.click();
    cy.url().should('contain', '/carts');
    app.cart.addAdditionalService(puppies.brook, cartAdditionalProducts.carrier);
    app.cart.verifyTotalPriceIsCorrect(puppies.brook.adoptFee + cartAdditionalProducts.carrier.price);
  });
  it('adopt Brook and Maggie Mae, add additional services and place the order', () => {
    app.puppyDetailsPage.navigateToPuppyDetailsPage(puppies.brook);
    app.puppyDetailsPage.adoptMeButton.click();
    cy.url().should('contain', '/carts');
    app.puppyDetailsPage.navigateToPuppyDetailsPage(puppies.maggieMae);
    app.puppyDetailsPage.adoptMeButton.click();
    cy.url().should('contain', '/carts');
    app.cart.addAdditionalService(puppies.brook, cartAdditionalProducts.vet);
    app.cart.addAdditionalService(puppies.brook, cartAdditionalProducts.collar);
    app.cart.addAdditionalService(puppies.maggieMae, cartAdditionalProducts.carrier);
    app.cart.completeAdoptionButton.click();
    app.adoptionCheckout.submitOrderForm(userDetails, 'Credit card');
    cy.url().should('equal', homePageURL);
    app.thanksForAdoptionMessage
      .should('be.visible')
      .should('contain', thanksForAdoptionText);
  });
});
