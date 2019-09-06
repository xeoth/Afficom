const Discord = require("discord.js")
const translation = require(`../translations/english.json`)

module.exports = async (client, message, member) => {
    // Ignore all bots
    if (message.author.bot) return;
  
      //The AntiSpam part

      const tf = require("@tensorflow/tfjs");
      const toxicity = require("@tensorflow-models/toxicity")
    
      const thr = 0.75;
    
      toxicity.load(thr).then(async model => {
        const sentence = message.content
        model.classify(sentence).then(async predictions => {
          if (predictions[6].results[0].match === true) {
            //Setting the emojis
            var names = ['identity', 'insult', 'obscene', 'severe', 'sexuallyexpl', 'threat']
            var i;
            for (i = 0; i < 6; i++) {
              if (predictions[i].results[0].match === true) {
                names[i] = "✅"
              } else if (predictions[i].results[0].match === false) {
                names[i] = "❎"
              } else {
                names[i] = "❓"
              }
            }
            const detectedMessageEmbed = new Discord.RichEmbed()
              .setTitle("Potentially toxic message detected!")
              .addField("Message content", `${message.content} ([jump to message](${message.url}))`)
              .addField("Message author", `${message.author.tag} \`ID: ${message.author.id}\``)
              .addField("Identity attack", names[0], true)
              .addField("Insult", names[1], true)
              .addField("Obscene", names[2], true)
              .addField("Severely toxic", names[3], true)
              .addField("Sexually explicit", names[4], true)
              .addField("Threat", names[5], true)
              .setFooter("🗑️ - delete the message, 🚫 - keep the message")
              .setColor("ff0000")
            
            //Find the channel (and check whether it exists) and send the message
            const filterChannel = message.guild.channels.find(x => x.name === "afficom-filtered-messages")
            if (!filterChannel) return
            const sentMessage = await filterChannel.send(detectedMessageEmbed)
            //Ability to take actions on messages via reactions
            await sentMessage.react("🗑")
            await sentMessage.react("🚫")
            sentMessage.createReactionCollector((reaction, user) =>
              message.guild.member(user).permissions.has("MANAGE_MESSAGES") &&
              reaction.emoji.name === '🗑' ||
              reaction.emoji.name === '🚫' &&
              user.bot === false
            ).once("collect", reaction => {
              const chosen = reaction.emoji.name
              if (chosen === '🗑') {
                if (!member.me.hasPermission('MANAGE_MESSAGES')) return;
                sentMessage.clearReactions()
                return message.delete(0)
              } else if (chosen === '🚫') {
                if (!member.me.hasPermission('MANAGE_MESSAGES')) return;
                sentMessage.clearReactions()
              }
            })
          }
        })
      })
      
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
    
  };