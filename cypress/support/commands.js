Cypress.Commands.add('formatString', (string) => string.trim().split('\n').join(' ').split('  ')
  .join(' '));
Cypress.Commands.add('getPriceValue', (priceByline) => Number(priceByline.match(/\d+\.?\d*$/)[0]));
