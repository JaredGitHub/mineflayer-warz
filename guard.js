const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin

const bot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: `guard`,
    skipValidation: true, // Helps avoid session validation errors
  });

bot.loadPlugin(pathfinder)
bot.loadPlugin(pvp)

bot.on('chat', (username, message) => {
  if (message === 'fight me') {
    const player = bot.players[username]

    if (!player) {
      bot.chat("I can't see you.")
      return
    }

    bot.pvp.attack(player.entity)
  }

  if (message === 'stop') {
    bot.pvp.stop()
  }
})





players:
  bababogi:
    team: testing
  bababogi0:
    team: testing
  bababogi1:
    team: test
  bababogi2:
    team: test
  bababogi3:
    team: test2
  bababogi4:
    team: test3
  bababogi5:
    team: test3
  Babbaboooey:
    team: test2
  bababogi6:
    team: test4
  bababogi7:
    team: test4
  bababogi8:
    team: test5
  bababogi9:
    team: test5
  bababogi10:
    team: test6
  bababogi11:
    team: test6
  bababogi12:
    team: test7
  bababogi13:
    team: test7

team:
  testing:
    Leader: bababogi
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi
    - bababogi0
  test:
    Leader: bababogi1
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi1
    - bababogi2
  test2:
    Leader: Babbaboooey
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi3
    - Babbaboooey
  test3:
    Leader: bababogi4
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi4
    - bababogi5
  test4:
    Leader: bababogi6
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi6
    - bababogi7
  test5:
    Leader: bababogi8
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi8
    - bababogi9
  test6:
    Leader: bababogi10
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi10
    - bababogi11
  test7:
    Leader: bababogi12
    Password: '123'
    FriendlyFire: false
    Members:
    - bababogi12
    - bababogi13

teams:
- testing
- test
- test2
- test3
- test4
- test5
- test6
- test7
