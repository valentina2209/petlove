import './e2e';

declare global {
    namespace Cypress {
        interface Chainable {
            // тут можна додавати свої команди, якщо захочеш
        }
    }
}