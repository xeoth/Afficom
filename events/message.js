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
          // console.log('----------')
          // console.log('Message             |', message.content)
          // console.log("Identity attack     |", predictions[0].results[0].match)
          // console.log("Insult              |", predictions[1].results[0].match)
          // console.log("Obscene             |", predictions[2].results[0].match)
          // console.log("Severe              |", predictions[3].results[0].match)
          // console.log("Sexually explicit   |", predictions[4].results[0].match)
          // console.log("Threat              |", predictions[5].results[0].match)
          // console.log("Final verdict       |", predictions[6].results[0].match)
          // console.log("----------")
          if (predictions[6].results[0].match === true) {
            //Setting the emojis
            var names = ['identity', 'insult', 'obscene', 'severe', 'sexuallyexpl', 'threat']
            var i;
            for (i = 0; i < 6; i++) {
              if (predictions[i].results[0].match === true) {
                names[i] = "✅"
              } else if (predictions[i].results[0].match === false) {
                names[i] = "❎"
              }
            }
            const detectedMessageEmbed = new Discord.RichEmbed()
              .setTitle("Potentially toxic message detected!")
              .addField("Message content", message.content)
              .addField("Identity attack", names[0], true)
              .addField("Insult", names[1], true)
              .addField("Obscene", names[2], true)
              .addField("Severely toxic", names[3], true)
              .addField("Sexually explicit", names[4], true)
              .addField("Threat", names[5], true)
              .setColor("ff0000")
            const filterChannel = message.guild.channels.find(x => x.name === "filtered-messages")
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