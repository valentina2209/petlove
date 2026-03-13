/// <reference path="../../node_modules/cypress/types/index.d.ts" />

describe('Валідація полів', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/login');
  });

  it('Показує помилку, якщо поле Email порожнє', () => {
    cy.get('button').contains(/Log In/i).click();

    // Перевіряємо наявність тексту "Required"
    cy.contains(/required/i).should('be.visible');

    // Перевіряємо колір (помаранчевий/жовтий, який ми виявили раніше)
    cy.get('input[name="email"]')
      .should('have.css', 'border-color', 'rgb(246, 184, 61)');
  });

  it('Показує помилку, якщо імейл введено некоректно', () => {
    // 1. Вводимо некоректний імейл
    cy.get('input[name="email"]').type('not-an-email');
    
    // 2. Клікаємо Log In
    cy.get('button').contains(/Log In/i).click();

    // 3. Шукаємо помилку. Додаємо "email" у список слів.

    cy.contains(/email|invalid|format|correct/i, { timeout: 8000 })
      .should('be.visible');
    
    // 4. Перевіряємо колір рамки
    cy.get('input[name="email"]')
      .should('have.css', 'border-color', 'rgb(246, 184, 61)');
  });
});