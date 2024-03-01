export class AdoptionCheckoutPage {
  get nameField() {
    return cy.get('#order_name');
  }

  get addressField() {
    return cy.get('#order_address');
  }

  get emailField() {
    return cy.get('#order_email');
  }

  get paymentMethodDropdown() {
    return cy.get('#order_pay_type');
  }

  get placeOrderButton() {
    return cy.get('button.submit');
  }

  submitOrderForm(userDetails, paymentType = 'Check') {
    this.nameField.type(userDetails.name);
    this.addressField.type(userDetails.address);
    this.emailField.type(userDetails.email);
    this.paymentMethodDropdown.select(paymentType);
    this.placeOrderButton.click();
  }
}
