/// <reference path="../../node_modules/cypress/types/index.d.ts" />

describe('Реєстрація', () => {
  const uniqueSeed = Date.now();
  const user = {
    name: 'TestUser',
    email: `tester${uniqueSeed}@test.com`,
    password: 'Password123'
  };

  it('Успішна реєстрація нового користувача', () => {
    cy.viewport(1280, 720);
    cy.visit('/register');

    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    
    // Якщо Confirm Password не має name, використовуємо eq(3)
    cy.get('input').eq(3).type(user.password); 

    cy.get('button').contains(/Registration/i).click();

    // ТЕПЕР ПЕРЕВІРЯЄМО ПРОФІЛЬ (бо сайт редиректить туди)
    cy.url({ timeout: 15000 }).should('include', '/profile');
    
    // Можна також перевірити, чи з'явилося ім'я користувача в Navbar
    cy.contains(user.name).should('be.visible');
    
    cy.log('Успішно зареєстровано та залогінено:', user.email);
  });
});