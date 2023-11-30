export const gameMove = async (channel, x, y, player, turn) => {
    await channel.sendEvent({
        type: 'game-move',
        data: {
            x, y, player, turn
        }
    })
}

export const stopWatching = async (channel, setChannel) => {
    await channel.stopWatching();
    setChannel(null);
}

export const reset = async (channel) => {
    await channel.sendEvent({
        type: 'reset'
    })
}