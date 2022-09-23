const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'f902744b8b9a447497c366b947060aed',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const messages = ['Hiiii', 'whats up', 'plants have little mouths on them they breathe out of']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/messages', (req, res) => {
    res.status(200).send(messages)
})

app.post('/api/messages', (req, res) => {
   let {name} = req.body

   const index = messages.findIndex(message => {
       return message === msg
   })

   try {
       if (index === -1 && msg !== '') {
           messages.push(msg)
           res.status(200).send(messages)
           rollbar.log('message successfully pushed to array')
       } else if (name === ''){
           res.status(400).send('You didnt write anything')
           rollbar.error('No message provided')
       } else {
           res.status(400).send('Dont spam my wall!')
           rollbar.error('message is already in array')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/messages/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    messages.splice(targetIndex, 1)
    res.status(200).send(messages)
})


const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))
