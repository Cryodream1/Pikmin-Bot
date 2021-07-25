const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "daily", // name of the command
    description: "Collect your daily reward", // description

    async run (client, message, args) {
      const check = await db.get(`dailyCheck_${message.author.id}`);
      const timeout = 86400000;
      if(check !== null && timeout - (Date.now() - check) > 0) {
        const ms = require("pretty-ms")
        const timeLeft = ms(timeout - (Date.now() - check))
        let embedailyno = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} You already claimed your daily reward!`)
        .setDescription(`You can claim it again in ${timeLeft}`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embedailyno)
      } else {
        let reward = 100
        let embedailyyes= new Discord.MessageEmbed()
        .setTitle(`${message.author.username} You claimed ${reward}${currency}`)
        .setDescription(`Comeback tomorrow to claim your daily reward again`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        let currentBalance = await db.get(`wallet_${message.author.id}`)
        message.channel.send(embedailyyes)
        if(currentBalance === null) currentBalance = 0
        await db.set(`wallet_${message.author.id}`, currentBalance + reward)
        await db.set(`dailyCheck_${message.author.id}`, Date.now())
      }
    }
}
