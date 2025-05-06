// ** Grant OP to Archer **
// file: example.js
const mineflayer = require('mineflayer')
const minecraftHawkEye = require('minecrafthawkeye');
const Vec3 = require('Vec3')

const bot = mineflayer.createBot({
    host: process.argv[2] ? process.argv[2] : 'localhost',
    port: process.argv[3] ? parseInt(process.argv[3]) : 25565,
    username: process.argv[4] ? process.argv[4] : 'Archer',
    password: process.argv[5]
})

bot.loadPlugin(minecraftHawkEye)

bot.on('spawn', function() {
    bot.chat('/give ' + bot.username + ' bow{Enchantments:[{id:unbreaking,lvl:3}]} 1')
    bot.chat('/give ' + bot.username + ' minecraft:arrow 300')
    bot.chat('/time set day')
    bot.chat('/kill @e[type=minecraft:arrow]')
    bot.chat('Ready!')

    // Get target for block position, use whatever you need
    const target = bot.hawkEye.getPlayer()
    console.log(target)
    if (!target) {
        return false
    }

    weapon = 'bow'
    // Auto attack every 1,2 secs until target is dead or is to far away
    bot.hawkEye.autoAttack(target, weapon)
        // If you force stop attack use:
        // hawkEye.stop();

    // Use one shot time with calc:
    // bot.hawkEye.oneShot(target);

    // If you want to shot in XYZ position:
    /*
          const blockPosition = {
                  position: new Vec3(244.5, 75.5, -220),
                  isValid: true
              }
          // bot.hawkEye.oneShot(blockPosition);
          // bot.hawkEye.autoAttack(blockPosition);
      */
})