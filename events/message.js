const Discord = require("discord.js")

module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
      //The AntiSpam part

      const tf = require("@tensorflow/tfjs");
      const toxicity = require("@tensorflow-models/toxicity")
    
      const thr = 0.75;
    
      toxicity.load(thr).then(model => {
        const sentence = message.content
        model.classify(sentence).then(predictions => {
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
              .setColor("ff0000")
            
            //Find the channel (and check whether it exists) and send the message
            const filterChannel = message.guild.channels.find(x => x.name === "filtered-messages")
            if (!filterChannel) return
            filterChannel.send(detectedMessageEmbed)
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