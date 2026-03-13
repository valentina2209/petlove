/// <reference path="../../node_modules/cypress/types/index.d.ts" />

describe('Сценарій авторизації', () => {
  beforeEach(() => {
    // Встановлюємо розмір екрана та заходимо на сторінку логіну
    cy.viewport(1280, 720);
    cy.visit('/login');
  });

  it('Користувач може успішно увійти', () => {
    // 1. Вводимо дані
    cy.get('input[name="email"]').type('Anna@i.ua');
    cy.get('input[name="password"]').type('123654789');

    // 2. Клікаємо на кнопку
    cy.get('button').contains(/Log In/i).click();

    // 3. Перевіряємо, що URL змінився на /profile
    cy.url().should('include', '/profile');

    // 4. Чекаємо на завантаження імені користувача (збільшений таймаут)
    // Якщо в профілі інше ім'я, заміни 'TestUser' на потрібне
    cy.contains(/TestUser|Anna/i, { timeout: 10000 }).should('be.visible');
    
    // 5. Перевіряємо, що кнопка виходу з'явилася
    cy.get('button').contains(/Log Out/i).should('be.visible');
  });

  it('Показує помилку або не пускає при неправильному паролі', () => {
    // 1. Вводимо завідомо неправильні дані
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('wrong_password');
    
    // 2. Клікаємо Log In
    cy.get('button').contains(/Log In/i).click();

    // 3. ПЕРЕВІРКА: Ми МАЄМО залишитися на сторінці логіну
    cy.url().should('include', '/login');
    cy.url().should('not.include', '/profile');

    // 4. Спроба знайти текст помилки (якщо він є на екрані)
    // Ми шукаємо будь-яке слово, що часто буває в помилках
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      if (text.includes('invalid') || text.includes('error') || text.includes('wrong') || text.includes('failed')) {
        cy.contains(/invalid|error|wrong|failed/i).should('be.visible');
      } else {
        // Якщо тексту немає, просто підтверджуємо, що кнопка все ще на екрані
        cy.get('button').contains(/Log In/i).should('be.visible');
      }
    });
  });
});