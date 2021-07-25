const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "leaderboard", // name of the command
    description: "Shows the top 5 people in the server", // description

    async run (client, message, args) {
      
    }
}
