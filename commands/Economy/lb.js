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
    name: "lb", // name of the command
    description: "Shows the top 5 people in the server", // description

    async run (client, message, args) {
      Data.find({
        lb: "all"
      }).sort([
        ['total', 'descending']
      ]).exec((err, res) => {
        if(err) console.log(err)

        var page = Math.ceil(res.length / 10)

        let pg = parseInt(args[0])
        if(pg != Math.floor(pg)) pg = 1;
        if(!pg) pg = 1
        let end = pg * 10
        let start = (pg * 10) - 10

        let embed = new Discord.MessageEmbed()
        embed.setTitle("Top earners")

        if(res.length === 0) {
          embed.addField("Error", "No pages found")
        } else if(res.length < start) {
          embed.addField("Error", "Page not found")
        } else if(res.length < end) {
          embed.setFooter(`page  ${pg} of ${page}`)
          for(i = start; i < res.length; i++) {
            embed.addField(`${i + 1}. ${res[i].name}`, `${currency}${res[i].total.toLocaleString()}`)
          }
        } else {
          embed.setFooter(`page  ${pg} of ${page}`)
          for(i = start; i < end; i++) {
            embed.addField(`${i + 1}. ${res[i].name}`, `${currency}${res[i].total.toLocaleString()}`)
          }
        }
        message.channel.send(embed)
      })
    }
}
