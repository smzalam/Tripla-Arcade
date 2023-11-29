import { StreamChat } from "stream-chat";

export const streamChatConfig = {
    apiSecret: import.meta.env.VITE_apiSecret,
    apiKey: import.meta.env.VITE_apiKey
}

export const client = StreamChat.getInstance(streamChatConfig.apiKey);
