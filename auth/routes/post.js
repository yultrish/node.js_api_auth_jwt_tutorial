const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({posts: {title: 'my first post', description: 'random data you shouldnt access'}})
})


module.exports = router;