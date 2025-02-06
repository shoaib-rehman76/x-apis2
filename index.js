import express from 'express'
const app = express()
import env from 'dotenv'
import xRouter from './routes/xTrendsRoutes.js'
import axios from 'axios'
import axiosRetry from 'axios-retry'

env.config({})

export const twitterClient = axios.create({
    baseURL: 'https://api.twitter.com/2/',
    timeout: 300000,
    headers: {
        'Authorization': `Bearer ${process.env.TOKEN}`,
    },

});

// axiosRetry(twitterClient, {
//     retries: 10, // Number of retries
//     retryDelay: (retryCount) => {
//         console.log(`Retry attempt: ${retryCount}`);
//         return retryCount * 2000; // Exponential backoff delay between retries (2 seconds)
//     },
//     retryCondition: (error) => {
//         // Retry on network errors or 5xx server errors
//         return error.code === 'ECONNRESET' || axiosRetry.isNetworkOrIdempotentRequestError(error);
//     },
// });


app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center">Server is Connected</h1>')
})

app.use('/api', xRouter)
const server = app.listen(process.env.PORT, () => console.log('connected'));
// Set server timeout to 5 minutes (300,000 milliseconds)
server.setTimeout(300000);