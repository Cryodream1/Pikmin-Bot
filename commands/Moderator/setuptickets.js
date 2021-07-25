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
    name: "setuptickets", // name of the command
    description: "Open the shop", // description

    async run (client, message, args) {
      if (message.author.bot || message.channel.type === 'dm') return;

      
    }
}
