import express from 'express';
import { loadAllTweets, loadTweetConversation } from '../controllers/xTrendsController.js';

const router = express.Router()
router.route('/load-all-tweets').get(loadAllTweets)
router.route('/load-tweet-conversation/:id').get(loadTweetConversation)




export default router;