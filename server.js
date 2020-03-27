require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const serveStatic = require('serve-static')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.use(serveStatic(path.join(__dirname, 'js'), {
  maxAge: '1d'
}))
app.options('*', cors())

app.listen(port, () => console.log(`Server running on port ${port}!`))
