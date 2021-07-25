const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "withdraw", // name of the command
    description: "Withdraw money from the bank", // description

    async run (client, message, args) {
      let number = message.content.substring(5)
      let amount = parseInt(number.split(" ")[1])
      let currentWalletBalance = await db.get(`wallet_${message.author.id}`)
      let currentBankBalance = await db.get(`bank_${message.author.id}`)
      let depembed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} You withdrew ${amount}${currency} from your bank!`)
      .setColor("BLUE")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      if(currentWalletBalance === null) currentWalletBalance = 0
      if(currentBankBalance === null) currentBankBalance = 0
      let invalidembed = new Discord.MessageEmbed()
      .setTitle("Invalid command")
      .addField("Example of how to use the command:", ";withdraw 100")
      .setColor("BLUE")
      if(amount > currentBankBalance) {
        message.channel.send("You dont have enough money")
      } else {
        if(!amount) {
          message.channel.send(invalidembed)
        } else {
            await db.set(`bank_${message.author.id}`, currentBankBalance - amount)
            await db.set(`wallet_${message.author.id}`, currentWalletBalance + amount)
            message.channel.send(depembed)
          }
      }
    }
}
