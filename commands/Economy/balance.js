const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "balance", // name of the command
    description: "Check your economy balance", // description

    async run (client, message, args) {
      let balance = await db.get(`wallet_${message.author.id}`)
      let bank = await db.get(`bank_${message.author.id}`)
      let member20000 = message.mentions.members.first()
      let currentWalletBalance = await db.get(`wallet_${message.author.id}`)
      let currentBankBalance = await db.get(`bank_${message.author.id}`)
      if(!member20000) {
        if(currentWalletBalance === null) currentWalletBalance = 0
        if(currentBankBalance === null) currentBankBalance = 0

      
        let moneyembed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}'s Balance`)
        .setDescription(`Wallet: ${currentWalletBalance}${currency}\nBank: ${currentBankBalance}${currency}`)
        .setColor("BLUE")
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

        message.channel.send(moneyembed)
      } else {
        let memberid = member20000.user.id
        let currentWalletBalance2 = await db.get(`wallet_${memberid}`)
        let currentBankBalance2 = await db.get(`bank_${memberid}`)
        if(currentWalletBalance2 === null) currentWalletBalance2 = 0
        if(currentBankBalance2 === null) currentBankBalance2 = 0
        let pingembed = new Discord.MessageEmbed()
        .setTitle(`${member20000.user.username}'s Balance`)
        .setDescription(`Wallet: ${currentWalletBalance2}${currency}\nBank: ${currentBankBalance2}${currency}`)
        .setColor("BLUE")
        .setThumbnail(member20000.user.displayAvatarURL({dynamic: true}))
        message.channel.send(pingembed)
      }
    }
}