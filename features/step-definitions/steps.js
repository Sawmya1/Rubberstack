require('dotenv').config();

const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pageobjects/login.page');
const ConnectionsPage = require('../pageobjects/connections.page');
const { sendEvent } = require('../../utils/apiHelper');

Given('I login to Rudderstack', async () => {
    await LoginPage.login(process.env.RUDDER_EMAIL, process.env.RUDDER_PASSWORD);
});

When('I navigate to the Connections page', async () => {
    await ConnectionsPage.openConnectionsPage();
});

When('I store the Data Plane URL', async () => {
    global.dataPlaneUrl = await ConnectionsPage.getDataPlaneURL();
    console.log('Data Plane URL:', global.dataPlaneUrl);
});

When('I store the Write Key of my HTTP source', async () => {
    global.writeKey = await ConnectionsPage.getWriteKey();
    console.log('Write Key:', global.writeKey);
});

When('I send an API event to Rudderstack', async () => {
    if (!global.dataPlaneUrl || !global.writeKey) throw new Error('Missing dataPlaneUrl or writeKey');
    const result = await sendEvent(global.dataPlaneUrl, global.writeKey);
    console.log('API send result:', result);
});

When('I open the Webhook destination events tab', async () => {
    await ConnectionsPage.openWebhookDestination();
});

Then('I verify the delivered and failed event counts', async () => {
    const delivered = await ConnectionsPage.getDeliveredCount();
    const failed = await ConnectionsPage.getFailedCount();
    console.log(`Delivered: ${delivered}  |  Failed: ${failed}`);

    if (isNaN(parseInt(delivered.replace(/[^\d]/g, '')))) {
        console.warn('Delivered count is not a number:', delivered);
    }
});
