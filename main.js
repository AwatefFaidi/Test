



const express = require('express')
const common = require('./app/controllers/common')
const router = express()


const port = 3000

const task1 = require('./app/controllers/task1') 
const task2 = require('./app/controllers/task2') 
const task3 = require('./app/controllers/task3') 



router.get('/I/want/title', (req, resp) => {
  
  
  task1.Test(req, resp)
	
})

router.all('/*', (req, resp) => {
  resp.sendStatus(404);
})




router.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


