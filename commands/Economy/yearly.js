const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "yearly", // name of the command
    description: "Collect your yearly reward", // description

    async run (client, message, args) {
    const check = await db.get(`yearlyCheck_${message.author.id}`);
    const timeout = 31536000000;
    if(check !== null && timeout - (Date.now() - check) > 0) {
      const ms = require("pretty-ms")
      const timeLeft = ms(timeout - (Date.now() - check))
      let embedyearlyno = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} You already claimed your yearly reward!`)
      .setDescription(`You can claim it again in ${timeLeft}`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(embedyearlyno)
    } else {
      let reward = 10000
      let embedyearlyyes= new Discord.MessageEmbed()
      .setTitle(`${message.author.username} You claimed ${reward}${currency}`)
      .setDescription(`Comeback next year to claim your yearly reward again`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      let currentBalance = await db.get(`wallet_${message.author.id}`)
      message.channel.send(embedyearlyyes)
      if(currentBalance === null) currentBalance = 0
      await db.set(`wallet_${message.author.id}`, currentBalance + reward)
      await db.set(`yearlyCheck_${message.author.id}`, Date.now())
    }
    }
}
