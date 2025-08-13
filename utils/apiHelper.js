const axios = require('axios');

async function sendEvent(dataPlaneUrl, writeKey, event = null) {
    if (!dataPlaneUrl || !writeKey) throw new Error('dataPlaneUrl or writeKey is missing');

    const endpoint = `${dataPlaneUrl.replace(/\/+$/, '')}/v1/track`; // ensure no trailing slash
    const eventPayload = event || {
        userId: "test-user",
        event: "SDET Test Event",
        properties: { timestamp: new Date().toISOString() }
    };

    const authHeader = 'Basic ' + Buffer.from(writeKey + ':').toString('base64');

    const res = await axios.post(endpoint, eventPayload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        timeout: 10000
    });

    return res.data;
}

module.exports = { sendEvent };
