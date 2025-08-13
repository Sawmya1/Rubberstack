const { $, browser } = require('@wdio/globals');

class LoginPage {
    get emailInput() { return $('[data-testid="Email"]'); }
    get passwordInput() { return $('[data-testid="Password"]'); }
    get loginButton() { return $("//button[.//span[text()='Log in']]"); }

    async open() {
        await browser.url('https://app.rudderstack.com/login');
    }
x

    async login(email, password) {
        await this.open();
        await this.emailInput.waitForExist({ timeout: 10000 });
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
        // Wait until navigation to connections/dashboard - adjust to a stable element on dashboard
        await browser.pause(2000);
    }
}

module.exports = new LoginPage();
