const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(message.author.id !== client.config.ownerID) return;
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
    const arguments = message.content.split(" ").slice(1);
    try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};