import { get } from "../services/ApiEndpoint.js"


export const profilePageLoader=async()=>{
    const chatPromise= await get('/api/chats/getchats')

    return ({
        chatPromise:chatPromise
    })
}