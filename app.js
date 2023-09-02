if (process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

const path = require('path')
const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use('/',require('./routes/router'))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`listening ${port}`);
})