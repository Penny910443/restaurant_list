const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

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
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(function (restaurant) {
    const searchByName = restaurant.name.trim().toLowerCase().includes(keyword)
    const searchByCategory = restaurant.category.trim().includes(keyword)
    return searchByName || searchByCategory
  })
  res.render('index', { restaurants, keyword })
})
app.listen(port, () => {
  console.log(`Express is listening localhost:${port}`)
})