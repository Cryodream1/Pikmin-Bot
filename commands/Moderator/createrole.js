const Discord = require('discord.js')
const guild = new Discord.Guild()

module.exports = {
    name: "createrole", // name of the command
    description: "test command", // description

    async run (client, message, args) {
      let argus = message.content.split(" ");
      argus.shift();

      guild.roles.create({
      data: {
        name: argus[0],
        color: argus[1],
      },
      reason: 'Yes',
      })
    .then(console.log)
    .catch(console.error);
    }
}
