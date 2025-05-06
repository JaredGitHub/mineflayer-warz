const mineflayer = require('mineflayer');

const botCount = parseInt(process.argv[2]) || 1;

for (let i = 0; i < botCount; i++) {
  createBot(i);
}

function createBot(index) {
  const bot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: `dumbbot${index}`,
    skipValidation: true,
  });

  bot.once('spawn', () => {
    console.log(`Bot ${index} has spawned.`);

    setInterval(() => {
      
      bot.activateItem(); // Activate the item in hand
      bot.setQuickBarSlot(0); // Set the quick bar slot to 3
    }, 20);
  });

  bot.on('error', (err) => {
    console.error(`Bot ${index} encountered an error:`, err);
  });

  bot.on('end', () => {
    console.log(`Bot ${index} has disconnected.`);
  });
}
