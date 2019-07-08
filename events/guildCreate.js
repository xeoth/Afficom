
module.exports = async (client, member) => {
    const requestedChannel = member.channels.find(x => x.name === "afficom-filtered-messages")
    if (!requestedChannel) {
        if (!member.me.hasPermission('MANAGE_CHANNELS')) return member.owner.send("Hello!\nThe admins of your server have added me, but it seems like I'm missing the *manage channels* permission. Please, create a channel called *#afficom-filtered-messages* (make sure I have a read and write access to it) and consider giving me the *manage channels* permission. Otherwise, the bot might not function as intended.\nThanks!");
        const filterChannel = await member.createChannel('afficom-filtered-messages')
        filterChannel.overwritePermissions(client.user.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        })
        filterChannel.overwritePermissions(member.id, {
            VIEW_CHANNEL: false
        })
        const sentMessage = await filterChannel.send("This is the channel in which all detected messages will be waiting for review. Please, __do not delete or change the name of this channel!__")
        sentMessage.pin()
    }
}