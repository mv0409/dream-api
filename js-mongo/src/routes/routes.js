const express = require('express')
const cb = require('../middlewares/express-callback')

const router = express.Router()

router.get('/api',(req,res) => {
    res.send('here')
})

module.exports = router