import LoginPage from './pages/LoginPage'

describe('Login Tests', () => {
  it('should login successfully', () => {
    LoginPage.visit()
    LoginPage.login('testUser', 'testPass123')
    cy.url().should('include', '/dashboard')
  })
})
