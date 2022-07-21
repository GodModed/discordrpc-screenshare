const RPC = require("discord-rpc");
let rpc;

let timestamp;
let ready = false;

module.exports = {
    start: function () {
        rpc = new RPC.Client({ transport: "ipc" });
        rpc.login({
            clientId: require('../config.json').client_id
        })

        timestamp = new Date();

        rpc.on("ready", () => {
            console.log("RPC Ready");
            ready = true;
            rpc.setActivity({
                details: "My screen live via Discord RPC",
                state: `Frame 0`,
                startTimestamp: timestamp,
                largeImageText: "My Screen",
                smallImageText: "Status",
                instance: false
            })
        });
    },

    update: function (customId, frameNum) {
        if (!ready) return;
        rpc.setActivity({
            details: "My screen live via Discord RPC",
            state: `Frame ${frameNum}`,
            startTimestamp: timestamp,
            largeImageKey: "http://screen.godmode.social/" + customId,
            largeImageText: "My Screen",
            smallImageKey: "https://external-preview.redd.it/yeDLRCV86xcCGT_QSemXjo4uFM8V4B3b6iYER8T6swg.jpg?width=960&crop=smart&auto=webp&s=3658c2ac85fdacca49621e3f94e98ac4b06f8136",
            smallImageText: "Status",
            instance: false
        })
    }
}