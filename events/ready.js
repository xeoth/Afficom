module.exports = (client, message) => {
    function refresh() {
        client.user.setActivity(`${client.config.prefix}help | watching ${client.guilds.size} servers!`)
    }
    refresh()
    setInterval(refresh, 86400000)
}