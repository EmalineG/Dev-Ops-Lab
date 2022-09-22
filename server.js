const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const students = ['Jimmy', 'Timothy', 'Jimothy']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/students', (req, res) => {
    res.status(200).send(students)
})

app.post('/api/students', (req, res) => {
   let {name} = req.body

   const index = students.findIndex(student => {
       return student === name
   })

   try {
       if (index === -1 && name !== '') {
           students.push(name)
           rollbar.log('Student was added successfully')
           res.status(200).send(students)
       } else if (name === ''){
           res.status(400).send('You must enter a name.')
           rollbar.error('No name provided')
       } else {
           res.status(400).send('That student already exists.')
           rollbar.error('Student is already in array')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/students/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    students.splice(targetIndex, 1)
    res.status(200).send(students)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))
