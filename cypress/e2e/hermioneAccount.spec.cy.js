/// <reference types='cypress' />

describe('Bank app', () => {
  const user = 'Hermoine Granger';
  const accountNumber = '1001';
  const balance = '5096';
  const depositAmount = '100';
  const balanceAfterDeposit = (+balance + +depositAmount).toString();
  const withdrawlAmount = '150';
  const balanceAfterWithdraw = (+balanceAfterDeposit - +withdrawlAmount)
    .toString();

  before(() => {
    cy.visit('/');
  });

  it('should provide the ability to work with Hermione\'s bank account', () => {
    cy.contains('.btn', 'Customer Login').click();
    cy.get('#userSelect').select(user);
    cy.contains('.btn', 'Login').click();

    cy.get('#accountSelect').should('contain', accountNumber);
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', balance).should('be.visible');
    cy.contains('.ng-binding', 'Dollar').should('be.visible');
    cy.contains('.btn', 'Deposit ').click();
    cy.get('.form-control').type(depositAmount);
    cy.contains('[type="submit"]', 'Deposit').click();
    cy.get('.error').should('contain', 'Deposit Successful');
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', balanceAfterDeposit).should('be.visible');

    cy.contains('.btn', 'Withdrawl ').click();
    cy.contains('[type="submit"]', 'Withdraw')
      .should('be.visible');
    cy.get('[placeholder="amount"]').type(withdrawlAmount);
    cy.contains('[type="submit"]', 'Withdraw').click();
    cy.get('.error').should('contain', 'Transaction successful');
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', balanceAfterWithdraw).should('be.visible');
  });
});
