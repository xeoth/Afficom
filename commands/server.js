const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.react("📨")
    message.author.send("Here's the invite link: https://discord.gg/RqqZKAg")
};