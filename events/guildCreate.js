const translation = require(`../translations/english.json`)

module.exports = async (client, member) => {
    const requestedChannel = member.channels.find(x => x.name === "afficom-filtered-messages")
    if (!requestedChannel) {
        if (!member.me.hasPermission('MANAGE_CHANNELS')) return member.owner.send(translation.missingPerms_managechannels);
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
        if (!member.me.hasPermission('MANAGE_MESSAGES')) return member.owner.send(translation.missingPerms_managemessages);
        sentMessage.pin()
    }
}