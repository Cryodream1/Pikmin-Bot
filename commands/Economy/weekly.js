const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "weekly", // name of the command
    description: "Collect your weekly reward", // description

    async run (client, message, args) {
      const check = await db.get(`weeklyCheck_${message.author.id}`);
      const timeout = 604800000;
      if(check !== null && timeout - (Date.now() - check) > 0) {
        const ms = require("pretty-ms")
        const timeLeft = ms(timeout - (Date.now() - check))
        let embedweeklyno = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} You already claimed your weekly reward!`)
        .setDescription(`You can claim it again in ${timeLeft}`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embeweeklyno)
      } else {
        let reward = 500
        let embedweeklyyes= new Discord.MessageEmbed()
        .setTitle(`${message.author.username} You claimed ${reward}${currency}`)
        .setDescription(`Comeback next week to claim your weekly reward again`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        let currentBalance = await db.get(`wallet_${message.author.id}`)
        message.channel.send(embedweeklyyes)
        if(currentBalance === null) currentBalance = 0
        await db.set(`wallet_${message.author.id}`, currentBalance + reward)
        await db.set(`weeklyCheck_${message.author.id}`, Date.now())
      }
    }
}
