const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');
const fs = require('fs')
const { isReplit } = require('../../config.json')

module.exports = {
    name: "addticketsystem", // name of the command
    description: "test command", // description

    async run (client, message, args) {
      const channel = message.mentions.channels.first()
      if(!channel) {
        message.channel.send('Please mention a channel')
        return
      }
      const embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Tickets')
      .setDescription('Want to talk to a staff member about a problem or suggestion?\nThen open a ticket here')
      .setFooter(':D')
      channel.send(embed).then(message => {
          message.react('🎟️')
      })
        if(isReplit === "No") {
          var name = '../../serverstuffs.json'
          var m = JSON.parse(fs.readFileSync(name).toString());
          m.forEach(function(p){
            message.id = m.name;
          });
          fs.writeFileSync(name, JSON.stringify(m));
        } else {
          let server = message.guild.id
          await db.set(`serverId_${server}`, server)
          let cheese = await db.get(`ticketId_${server}`)
          await db.set(`ticketId${server}`, message.id)
          let pizza = await db.get(`channelId${server}`)
          await db.set(`channelId${server}`, channel.parent.id)
          console.log(pizza)
        }
        console.log(message.id)
      message.delete()
    }
}
