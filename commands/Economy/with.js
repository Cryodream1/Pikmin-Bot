const Discord = require('discord.js')
const mongoose = require("mongoose")
const privatebotconfig = require('../../../privatebotconfig.json')
const { currency } = require('../../config.json');

mongoose.connect(privatebotconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Data = require("../models/data.js")

module.exports = {
    name: "with", // name of the command
    description: "Deposit your money into the bank", // description

    async run (client, message, args) {
      
      let number = message.content.substring(5)
      let amount = parseInt(number.split(" ")[1])
      let amount2 = number.split(" ")[1]
      let user = message.author
      Data.findOne({
        userID: user.id
      }, (err, data) => {
        if(err) console.log(err)
          let invalidembed = new Discord.MessageEmbed()
          .setTitle("Invalid command")
          .addField("Example of how to use the command:", ";withdraw 100")
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        if(!data) {
          const newData = new Data({
            name: user.username,
            userID: user.id,
            lb: "all",
            job: "",
            wallet: 0,
            bank: 0,
            total: 0,
            daily: 0,
            weekly: 0,
            monthly: 0,
            yearly: 0,
          })
          newData.save().catch(err => console.log(err))
          let noamount = new Discord.MessageEmbed()
          .setTitle("Invalid amount")
          .setDescription(`You're trying to deposit ${currency}${amount} when you only have ${currency}${data.bank}`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          if(!amount) return message.channel.send(invalidembed)
          if(amount > data.bank) return message.channel.send(noamount)
          if(data.bank === null || data.bank === 0) return message.channel.send("You dont have any money!")
          } else {
          let invalidembed = new Discord.MessageEmbed()
          .setTitle("Invalid command")
          .addField("Example of how to use the command:", ";withdraw 100")
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          let noamount = new Discord.MessageEmbed()
          .setTitle("Invalid amount")
          .setDescription(`You're trying to withdraw ${currency}${amount} when you only have ${currency}${data.bank}`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          
          if(!amount) { 
            if(amount2 === "all") {
              let amount3 = data.bank
              let embed2 = new Discord.MessageEmbed()
              .setTitle(`${message.author.username} you withdrew ${currency}${amount3} from your bank`)
              .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
              data.bank -= amount3
              data.wallet += amount3
              data.total = (data.wallet + data.bank)
              data.save().catch(err => console.log(err))
              
              return message.channel.send(embed2)
            } else {
            return message.channel.send(invalidembed)
            }
          }
          if(amount > data.bank) return message.channel.send(noamount)
          if(data.bank === null || data.bank === 0) return message.channel.send("You dont have any money!")
          let embed = new Discord.MessageEmbed()
          .setTitle(`You succesfully withdrew ${currency}${amount} from your bank`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          data.bank -= amount
          data.wallet += amount
          data.total = (data.wallet + data.bank)
          data.save().catch(err => console.log(err))

          return message.channel.send(embed)
        }
      })
    }
}