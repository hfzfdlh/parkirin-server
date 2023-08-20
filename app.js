if (process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',require('./routes/router'))

app.listen(port, ()=>{
    console.log(`listening ${port}`);
})