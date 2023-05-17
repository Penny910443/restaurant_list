const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const routes = require('./routes')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)




app.listen(port, () => {
  console.log(`Express is listening localhost:${port}`)
})