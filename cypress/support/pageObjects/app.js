import { PuppyDetailsPage } from './puppyDetailsPage';
import { PuppiesList } from './puppiesList';
import { CartPage } from './cartPage';
import { AdoptionCheckoutPage } from './adoptionCheckoutPage';

export class App {
  puppyDetailsPage;

  puppiesList;

  cart;

  adoptionCheckout;

  constructor() {
    this.puppyDetailsPage = new PuppyDetailsPage();
    this.puppiesList = new PuppiesList();
    this.cart = new CartPage();
    this.adoptionCheckout = new AdoptionCheckoutPage();
  }

  get thanksForAdoptionMessage() {
    return cy.get('p#notice');
  }

  open(targetURL = '') {
    cy.visit(targetURL);
  }
}
