const mineflayer = require('mineflayer');

const botCount = parseInt(process.argv[2]) || 1;
const host = 'localhost';
const port = 25565;

// Spawns multiple bots
for (let i = 0; i < botCount; i++) {
    createBot(i);
}

function createBot(index) {
    const bot = mineflayer.createBot({
        host,
        port,
        username: `bababogi${index}`,
        skipValidation: true,
        version: 1.21,
    });

    forceAim(bot);
    bot.once('spawn', async () => {
        console.log(`✅ Bot ${index} spawned.`);

        shootPlayer(bot);
        setInterval(() => {
            if (bot.health < 20) {
                bot.setQuickBarSlot(3);
                bot.activateItem();
            } 
            else {
                trackNearestPlayer(bot);
            }

        }, 20);
        
        setInterval(() => maybeSneak(bot), 2000);
    });

    bot.on('error', (err) => {
        console.error(`❌ Bot ${index} error:`, err);
    });

    bot.on('end', () => {
        console.log(`⚠️ Bot ${index} disconnected. Reconnecting...`);
        setTimeout(() => createBot(index), 5000); // Reconnect after delay
    });
}

//Decent tracking function

function trackNearestPlayer(bot) {

    let nearest = null;

    let nearestDistance = Infinity;

    for (const username in bot.players) {
        const player = bot.players[username];
        if (!player.entity || username === bot.username) continue;

        const distance = bot.entity.position.distanceTo(player.entity.position);
        if (distance < nearestDistance) {
            nearest = player;
            nearestDistance = distance;
        }
    }

    if (nearest && nearest.entity) {

        if (nearestDistance > 6) {

            if(nearestDistance > 15)
                {
                    bot.setControlState('forward', true);
                    bot.setControlState('sprint', true);
                    bot.setControlState('jump', true);
                }

            bot.setControlState('forward', true);
            bot.setControlState('sprint', true);
        } else {
            bot.setControlState('forward', false);
            bot.setControlState('sprint', false);
            bot.setControlState('jump', false);
        }
    }
}

//Working shoot player function
function shootPlayer(bot) {
    let currentSlotIndex = 0;
    const actionSlots = [0, 2, 1];
    const slotTimings = {
        0: 1200, // Sniper
        2: 123, // Shotgun
        1: 225, // Shotgun
    };

    function runCycle() {
        const slot = actionSlots[currentSlotIndex];
        bot.setQuickBarSlot(slot);

        // Get nearest player and focus on them before shooting
        let nearest = getNearestPlayer(bot); 
        if (nearest && nearest.entity) {
            const headPos = nearest.entity.position.offset(0, 1.62, 0);
            bot.lookAt(headPos, true);  // Make sure to look at the player
        }
        
        // Use the slot timings to control the cycle delay
        setTimeout(() => {
            // Cycle to the next slot after a delay
            currentSlotIndex = (currentSlotIndex + 1) % actionSlots.length;
            setTimeout(runCycle, slotTimings[slot]); // Use current slot's timing
        }, slotTimings[currentSlotIndex]); // Delay to ensure slot switch applies
    }

    runCycle();
}




function getNearestPlayer(bot) {
    let nearest = null;
    let nearestDistance = Infinity;

    for (const username in bot.players) {
        const player = bot.players[username];
        if (!player.entity || username === bot.username) continue;

        const distance = bot.entity.position.distanceTo(player.entity.position);
        if (distance < nearestDistance) {
            nearest = player;
            nearestDistance = distance;
        }
    }
    return nearest;
}

function forceAim(bot) {
    bot.on('physicsTick', () => {
        const target = getNearestPlayer(bot);
        if (target && target.entity) {
            const pos = target.entity.position.offset(0, 1.62, 0);
            const delta = pos.minus(bot.entity.position);

            const yaw = Math.atan2(-delta.x, -delta.z);
            const pitch = -Math.atan2(delta.y, Math.sqrt(delta.x ** 2 + delta.z ** 2));

            bot.activateItem();
            bot.entity.yaw = yaw;
            bot.entity.pitch = pitch;
            bot.activateItem();
        }
    });
}

// Occasionally sneak
function maybeSneak(bot) {
    if (Math.random() < 0.02) {
        bot.setControlState('sneak', true);
        setTimeout(() => bot.setControlState('sneak', false), 1000);
    }
}