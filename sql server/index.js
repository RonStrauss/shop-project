const express = require('express')

const app = express()

app.use(require('express-session')({
    secret:"UtterClusterFuck"
}))

app.use(require('cors')({
    credentials: true,
    origin:'http://localhost:4200'
}))

app.use(express.json())


app.listen(1000, ()=>{
    console.log(`Running on :1000!
http://localhost:1000`)
})