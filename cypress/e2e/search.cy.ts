/// <reference path="../../node_modules/cypress/types/index.d.ts" />

describe('Повна перевірка фільтрації', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/notices'); 
  });

  it('Користувач може шукати, очищувати та знову шукати', () => {
    const input = 'input[placeholder*="Search"]';

    // 1. Шукаємо кота
    cy.get(input).type('cat{enter}');
    cy.url().should('include', 'keyword=cat');
    cy.get('[class*="item"]').should('exist');

    // 2. Очищуємо пошук через хрестик
    // Знаходимо кнопку очищення всередині форми
    cy.get('form button').first().click({ force: true });
    cy.get(input).should('have.value', '');
    cy.url().should('not.include', 'keyword=cat');

    // 3. Шукаємо собаку
    cy.get(input).type('dog{enter}');
    cy.url().should('include', 'keyword=dog');
    cy.get('[class*="item"]').should('exist');
  });

  it('Сортування та скидання фільтрів', () => {
    // Натискаємо "Popular"
    cy.contains('button', /Popular/i).click();
    cy.url().should('include', 'sort=Popular');

    // Натискаємо "Reset"
    cy.contains('button', /Reset/i).click();
    
    // Перевіряємо, що параметри зникли з URL
    cy.url().should('not.include', 'sort=Popular');
    cy.get('input[placeholder*="Search"]').should('have.value', '');
  });
});