/// <reference path="../../node_modules/cypress/types/index.d.ts" />

describe('Мобільна версія та Бургер-меню', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport(375, 812);
    cy.visit('/home');
  });

  it('Навігація ховається, а бургер-меню відкривається через icon-burger', () => {
    // 1. Перевіряємо, що десктопна навігація прихована
    cy.get('nav[class*="desktopNav"]').should('not.be.visible');

    // 2. Відкриваємо бургер-меню
    // Використовуємо твій клас burgerBtn та правильну іконку з href
    cy.get('button[class*="burgerBtn"]')
      .find('use[href*="icon-burger"]')
      .should('be.visible')
      .parent()
      .click({ force: true });

    // 3. ПЕРЕВІРКА ПОСИЛАНЬ (за твоїм NAV_LINKS)
    // Додаємо підтримку перекладу через регулярні вирази
    
    // News
    cy.contains('a:visible', /News|Новини/i, { timeout: 7000 }).should('be.visible');
    
    // Find pet (замість Notices)
    cy.contains('a:visible', /Find pet|Шукати|Оголош/i).should('be.visible');
    
    // Our friends
    cy.contains('a:visible', /Our friends|Друзі/i).should('be.visible');

    // 4. ПЕРЕВІРКА ПЕРЕХОДУ
    cy.contains('a:visible', /Find pet|Шукати|Оголош/i).click({ force: true });
    cy.url().should('include', '/notices');

    // 5. ЗАКРИТТЯ МЕНЮ
    // На сторінці Notices знову відкриваємо меню, щоб перевірити кнопку закриття
    cy.get('button[class*="burgerBtn"]').click({ force: true });
    
    // Шукаємо кнопку закриття (хрестик). Зазвичай вона перша видима кнопка в меню
    cy.get('button:visible').find('use').then(($use) => {
        // Якщо в хедері з'явився хрестик (cross), клікаємо по ньому
        cy.wrap($use).parent().click({ force: true });
    });

    // Перевіряємо, що меню зникло
    cy.contains('a:visible', /Find pet/i).should('not.exist');
  });
});