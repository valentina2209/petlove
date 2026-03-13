/// <reference path="../../node_modules/cypress/types/index.d.ts" />

describe('Вихід із системи', () => {
  it('Користувач успішно виходить та перевіряє захист профілю', () => {
    cy.viewport(1280, 720);
    cy.visit('/login');
    cy.get('input[name="email"]').type('Anna@i.ua');
    cy.get('input[name="password"]').type('123654789');
    cy.get('button').contains(/Log In/i).click();
    cy.url().should('include', '/profile');
    cy.get('button').contains(/Log Out/i).click({ force: true });
    cy.contains('button', /Yes/i, { timeout: 10000 }).click({ force: true });
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.visit('/profile');
    cy.url().should('not.include', '/profile');
    
    cy.log('Тест пройдено: користувач успішно розлогінений і доступ до профілю закритий');
  });
});