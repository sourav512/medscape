const express  = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const fileupload = require('express-fileupload')
const cors = require('cors')
const request = require('request')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParse())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded ({extended:true}))
app.use(cors())


//middleware for file upload
app.use(fileupload({
    useTempFiles: true,
    tempFilePath: "/temp/"
})
);

const home = require('./routes/home')
const user = require('./routes/user')
const np = require('./routes/nodePython')


app.use('/api/v1/',home)
app.use('/api/v1/user',user)
app.use('/api/v1/np',np)



module.exports = app