const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.reply(`Pong! API latency is ${Math.round(client.ping)}ms`)
};