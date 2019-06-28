const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const infoEmbed = new Discord.RichEmbed()
        .setTitle("Info about Afficom")
        .addField("Developers", "Xeoth#1842")
        .addField("Toxicity models", "To detect toxic messages, we're using toxicity models from [tensorflow/tfjs-models](https://github.com/tensorflow/tfjs-models/tree/master/toxicity). They're licensed under [Apache 2.0](https://raw.githubusercontent.com/tensorflow/tfjs-models/master/LICENSE).")
        .setColor("0080ff")
    message.channel.send(infoEmbed)
    };