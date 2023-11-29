import { client } from "./config";

export async function connectCurrentUser(user, token) {
    
    try {
        await client.connectUser(user, token)   
        return true;
    } catch(error) {
        console.log(error)
        return error
    }
}

export async function disconnectCurrentUser() {
    try {
        client.disconnectUser();
    } catch(error) {
        console.log(error);
        return error
    }
}