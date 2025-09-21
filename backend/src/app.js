const express = require('express')

const app = express()

app.use(express.json())

app.get('/demo',(req,res)=>{
    res.send('k')
})

module.exports = app