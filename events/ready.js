module.exports = (client, message) => {
    client.user.setActivity(`${client.config.prefix}help | watching ${client.guilds.size} servers!`)
}