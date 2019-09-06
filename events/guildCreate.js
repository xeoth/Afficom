const translation = require(`../translations/english.json`)

module.exports = async (client, member) => {
    //Checking permissions
    const manageChannels = member.me.hasPermission('MANAGE_CHANNELS');
    const manageMessages = member.me.hasPermission('MANAGE_MESSAGES');
    if (manageChannels === false || manageMessages === false) return;

    const requestedChannel = member.channels.find(x => x.name === "afficom-filtered-messages")
    if (!requestedChannel) {
        const filterChannel = await member.createChannel('afficom-filtered-messages')
        filterChannel.overwritePermissions(client.user.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        })
        filterChannel.overwritePermissions(member.id, {
            VIEW_CHANNEL: false
        })
        const sentMessage = await filterChannel.send(translation.description_detectedChannel)
        sentMessage.pin()
    }
}
