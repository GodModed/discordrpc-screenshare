const Screen = require('screenshot-win');

const folders = ["RPC Client", "Server"]

folders.forEach(folder => {
    const path = `./${folder}/index.js`;
    require(path).start();
});


let frameNum = 0;
setInterval(() => {
    frameNum++;
    let customId = Math.floor(Math.random() * 1000000).toString() + frameNum;
    Screen('screenshot');
    try {
        require(`./${folders[0]}/index.js`).update(customId, frameNum);
    } catch (e) {
        console.log(e);
    }
}, 1000 / require('./config.json').FPS)

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
    });