module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
      //The AntiSpam part

      const tf = require("@tensorflow/tfjs");
      const toxicity = require("@tensorflow-models/toxicity")
    
      const thr = 0.1;
    
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