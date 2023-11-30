import { client } from "./config";

export async function connectCurrentUser(user, token) {
    
    try {
        const userConnection = await client.connectUser(user, token)   
        console.log(userConnection)
        if (userConnection) {
            return true
        }
        return false
    } catch(error) {
        console.log(error)
        return false
    }
}

export async function disconnectCurrentUser() {
    try {
        client.disconnectUser();
    } catch(error) {
        console.log(error);
        return false
    }
}