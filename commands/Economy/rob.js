const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "rob", // name of the command
    description: "rob someones money", // description

    async run (client, message, args) {
      let member = message.mentions.members.first()
      let currentBalance = await db.get(`wallet_${message.author.id}`)
      let currentBalance2 = await db.get(`wallet_${member.user.id}`)
      const check = await db.get(`robCooldown_${message.author.id}`);
      const timeout = 300000;
      if(check !== null && timeout - (Date.now() - check) > 0) {
        const ms = require("pretty-ms")
        const timeLeft = ms(timeout - (Date.now() - check))
        message.channel.send("You can only rob someone every 5 minutes")
      } else {
      if(currentBalance < 500) {
        message.channel.send("You need at least 500$ to rob someone")
        await db.set(`robCooldown_${message.author.id}`, Date.now())
      } else {
      if(currentBalance2 < 500) {
        message.channel.send("That person doesnt have at least 500$")
        await db.set(`robCooldown_${message.author.id}`, Date.now())
      } else { 
      const check = await db.get(`robCheck_${message.author.id}`);
      const timeout = 10000;
      if(check !== null && timeout - (Date.now() - check) > 0) {
        const ms = require("pretty-ms")
        const timeLeft = ms(timeout - (Date.now() - check))
      } else {
      await db.set(`robCooldown_${message.author.id}`, Date.now())
      var randomness = [
        0,
        1,
        2,
        3
      ]
      var odds = [
        0,
        1,
        2,
        3
      ]
      var index2 = Math.floor(Math.random() * randomness.length);
      var index3 = Math.floor(Math.random() * odds.length);
      if(index2 === 2 && index3 === 2 || index2 === 2 && index3 === 3 || index2 === 2 && index3 === 1) {
        let amount = await db.get(`wallet_${member.user.id}`)
        let amount2 = amount/2
        message.channel.send(`You robbed ${member.user.username} of half their money and got ${amount2}${currency}!`)
        await db.set(`wallet_${message.author.id}`, currentBalance + amount2)
        await db.set(`wallet_${member.user.id}`, currentBalance2 - amount2)
        return
      }
      if(index2 === 3 && index3 === 3) {
        let amount = await db.get(`wallet_${member.user.id}`)
        message.channel.send(`You robbed ${member.user.username} of all their money and got ${amount}${currency}!`)
        await db.set(`wallet_${message.author.id}`, currentBalance + amount)
        await db.set(`wallet_${member.user.id}`, currentBalance2 - amount)
        return
      }
      if(index2 === 0) {
        message.channel.send(`You robbed ${member.user.username} of 500$!`)
        await db.set(`wallet_${message.author.id}`, currentBalance + 500)
        await db.set(`wallet_${member.user.id}`, currentBalance2 - 500)
        return
      }
      if(index2 === 1) {
        message.channel.send(`You got caught robbing ${member.user.username} and paid them 500$`)
        await db.set(`wallet_${message.author.id}`, currentBalance - 500)
        await db.set(`wallet_${member.user.id}`, currentBalance2 + 500)
        return
      }
      if(index2 === 2) {
        message.channel.send(`You got caught robbing ${member.user.username} and paid them 500$`)
        await db.set(`wallet_${message.author.id}`, currentBalance - 500)
        await db.set(`wallet_${member.user.id}`, currentBalance2 + 500)
        return
      }
      if(index2 === 3) {
        message.channel.send(`You robbed ${member.user.username} of 500$!`)
        await db.set(`wallet_${message.author.id}`, currentBalance + 500)
        await db.set(`wallet_${member.user.id}`, currentBalance2 - 500)
        return
      }
    }
      }
    }
  }
}
}