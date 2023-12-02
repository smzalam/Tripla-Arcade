export const stopWatching = async (channel, setChannel) => {
    await channel.stopWatching();
    setChannel(null);
}

export const reset = async (channel) => {
    await channel.sendEvent({
        type: 'reset'
    })
}