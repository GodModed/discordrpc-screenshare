const express = require('express');
const { CloudflaredTunnel } = require('node-cloudflared-tunnel');
const port = 3000;

module.exports = {
    start: function () {
        const tunnel = new CloudflaredTunnel();

        tunnel.token = require('../config.json').cloudflared_token;
        tunnel.start();

        //stop tunnel from outputting to console

        const app = express();

        app.get("/:frame", (req, res) => {
            res.sendFile(process.cwd() + `/screenshot.jpg`);
        })

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}