const mineflayer = require('mineflayer');


function createBot() {
  const bot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: `bababogi`,
    auth: 'microsoft',
    skipValidation: true,
  });

  bot.once('spawn', () => {
    console.log(`bababogi has spawned.`);
  });

  bot.on('error', (err) => {
    console.error(`Bot encountered an error:`, err);
  });

  bot.on('end', () => {
    console.log(`Bot  has disconnected.`);
  });
}

createBot();