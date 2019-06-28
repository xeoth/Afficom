
module.exports = async (client, member) => {
    const filterChannel = await member.createChannel('filtered-messages')
    filterChannel.overwritePermissions(client.user.id, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        ADD_REACTIONS: true
    })
    filterChannel.overwritePermissions(member.id, {
        VIEW_CHANNEL: false
    })
    filterChannel.send("This is the channel in which all detected messages will be waiting for review. Please, __do not delete or change the name of this channel!__")
}