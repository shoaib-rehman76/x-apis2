import axios from "axios";
import { twitterClient } from "../index.js";
import { getAllGemeineTrends } from "../helpers/scrapingApi.js";

const fetchTweets = async () => {
    const allTweetsArr = []
    const allTweetsObj = {}
    const hashtag = await getAllGemeineTrends()
    const keywords = Object.values(hashtag).splice(11, 20);
    
    for (const [idx, key] of keywords.entries()) {
        try {
            const nestedKey = (key.includes('#') || key.includes('$')) ? key.split('#')[1] || key.split('$')[1] : key
            const response = await twitterClient.get(`tweets/search/recent?query=${nestedKey}&max_results=20&tweet.fields=author_id,conversation_id,created_at,geo,id,lang,source,text&user.fields=created_at,description,entities,id,location,name,url,username`);
            const data = response.data.data;

            allTweetsObj[key] = data

        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Throwing an error with relevant details
                throw {
                    status: 429,
                    message: 'Too Many Requests',
                    details: error.response.data,
                };
            } else {
                console.error(`Error fetching tweets for keyword ${key}:`, error);
            }
        }
    }

    return allTweetsObj
};

export const loadAllTweets = async (req, res) => {
    try {        
        const tweets = await fetchTweets()
        if (!tweets || Object.keys(tweets).length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No tweets found',
                data: {},
            });
        }

        return res.status(201).json({
            status: 'success',
            message: 'data loaded successfully',
            data: tweets,
        })

    } catch (error) {
        if (error.status === 429) {
            return res.status(429).json({
                status: 'fail',
                message: error.message,
                details: error.details,
            });
        }

        res.status(500).json({
            status: 'fail',
            message: 'Server error',
        });
    }
}

export const loadSingleTweets = async (req, res) => {
    try {
        const response = await twitterClient.get(`tweets/search/recent?query=money&max_results=10&tweet.fields=author_id,conversation_id,created_at,geo,id,lang,source,text&user.fields=created_at,description,entities,id,location,name,url,username`)
        const data = response.data
        if (!response.data) {
            return res.status(403).json({
                status: 'fail',
                message: 'data not found',
                data,
            })
        }

        return res.status(201).json({
            status: 'success',
            message: 'data loaded successfully',
            data,
        })

    } catch (error) {
        throw new Error(error)
    }
}

export const loadTweetConversation = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id, 'id------>');
        // https://api.x.com/2/tweets/search/recent?query=conversation_id:1841006384235565302
        const response = await axios.get(`https://api.x.com/2/tweets/search/recent?query=conversation_id:${id}`)
        const data = response.data
        if (!response.data) {
            return res.status(403).json({
                status: 'fail',
                message: 'data not found',
                data,
            })
        }

        return res.status(201).json({
            status: 'success',
            message: 'Conversation loaded successfully',
            data,
        })

    } catch (error) {
        throw new Error(error)
    }
}

