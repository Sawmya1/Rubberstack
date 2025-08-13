const { $ } = require('@wdio/globals');

class ConnectionsPage {
    // PLACEHOLDERS — replace with real selectors you copy from DevTools:
    get dataPlaneElement() { return $('.sc-jrkPvW.ebfakN.text-ellipsis'); }     // top-right dataplane URL element
    get writeKeyElement() { return $$('.sc-kDnyiN.kWZpvc.text-ellipsis')[1]; }       // element showing HTTP source write key
    get sourcesList() { return $('.sc-hHvloA.sc-ekWTvC.enoulS.haKsTT.full-width'); }        // container where your HTTP source is listed
    get webhookDestinationItem() { return $("//*[@id='destination-31AnFrejsgWvDc3YI7LzGcfNc60']"); } // element for your webhook destination
    get destinationEventsTab() { return $$('.ant-tabs-tab')[2]; }     // events tab inside destination
    get deliveredCountElement() { return $('.sc-gKHVrV.kFyvFM'); }
    get failedCountElement() { return $('.sc-gKHVrV.kFyvFM'); }

    async openConnectionsPage() {
        await browser.url('https://app.rudderstack.com/connections');
        await browser.pause(4000);
    }

    async getDataPlaneURL() {
        await this.dataPlaneElement.waitForExist({ timeout: 10000 });
        return (await this.dataPlaneElement.getText()).trim();
    }

    async getWriteKey() {
        await this.writeKeyElement.waitForExist({ timeout: 10000 });
        const rawText = await this.writeKeyElement.getText();
        const key = rawText.replace(/^Write key\s*/, '').trim();
        console.log('Write:', key);
        return key;
    }

    async openWebhookDestination() {
    const tooltipCloseBtn = $('button[aria-label="Close"]'); // or use the selector for the "x" button
    if (await tooltipCloseBtn.isExisting() && await tooltipCloseBtn.isDisplayed()) {
        await tooltipCloseBtn.click();
        await browser.pause(500); // wait for tooltip to disappear
    }
        // click the destination item, then go to Events tab
        await this.webhookDestinationItem.waitForExist({ timeout: 10000 });
        await this.webhookDestinationItem.click();
        await this.destinationEventsTab.waitForExist({ timeout: 10000 });
        await this.destinationEventsTab.click();
        await browser.pause(1500);
    }

    async getDeliveredCount() {
        await this.deliveredCountElement.waitForExist({ timeout: 10000 });
        return (await this.deliveredCountElement.getText()).trim();
    }

    async getFailedCount() {
        await this.failedCountElement.waitForExist({ timeout: 10000 });
        return (await this.failedCountElement.getText()).trim();
    }
}

module.exports = new ConnectionsPage();
