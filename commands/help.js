const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const p = client.config.prefix
    const helpEmbed = new Discord.RichEmbed()
        .addField("Commands", `\`${p}info\`, \`${p}ping\`, \`${p}info\`, \`${p}server\``)
        .setFooter(`My prefix here is \"${p}\"`)
        .setColor("0080ff")
    message.channel.send(helpEmbed)
};