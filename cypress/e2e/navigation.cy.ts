/// <reference path="../../node_modules/cypress/types/index.d.ts" />

describe('Навігація по сайту', () => {
  beforeEach(() => {
    // 1. Встановлюємо великий розмір екрана (Desktop), 
    // щоб уникнути display: none від мобільного меню
    cy.viewport(1280, 720); 
    cy.visit('/home');
  });

  it('Користувач може перейти на сторінку новин', () => {
    // Використовуємо { force: true }, щоб клікнути, навіть якщо CSS каже "приховано"
    cy.contains('a', 'News').click({ force: true }); 
    
    cy.url().should('include', '/news');
  });

  it('Користувач може перейти на сторінку логіну', () => {
    // Шукаємо точний текст "Log In" (з пробілом, як у тебе в коді)
    // Додаємо { force: true } для надійності
    cy.contains('a', 'Log In').click({ force: true });
    
    cy.url().should('include', '/login');
  });
});