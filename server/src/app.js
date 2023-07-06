const express = require('express')
const planetsRouter = require('./routes/planets/planets.router')
const cors = require('cors')

const app = express()

app.use(
  cors({ origin : 'http://localhost:3000'}),
  planetsRouter,
  express.json()
)

module.exports = app