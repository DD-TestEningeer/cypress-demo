class LoginPage {
    usernameInput = '#username'
    passwordInput = '#password'
    loginButton = 'button[type="submit"]'
  
    visit() {
      cy.visit('/login')
    }
  
    login(username, password) {
      cy.get(this.usernameInput).type(username)
      cy.get(this.passwordInput).type(password)
      cy.get(this.loginButton).click()
    }
  }
  
  export default new LoginPage()
  