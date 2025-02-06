import axios from "axios";
import { twitterClient } from "../index.js";


export const allTweets = async (querFilters) => {
    console.log(querFilters, 'query----->');
    // try {
    const response = await twitterClient.get(`tweets/search/recent?query=money&max_results=10&tweet.fields=author_id,conversation_id,created_at,geo,id,lang,source,text&user.fields=created_at,description,entities,id,location,name,url,username`)

    console.log(response, 'response ------>');
    return response.data
    // } catch (error) {
    //     console.log(error.message, 'error');
    // }
}