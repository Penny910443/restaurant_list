const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurant = restaurants.filter(function (restaurant) {
        const searchByName = restaurant.name.trim().toLowerCase().includes(keyword)
        const searchByCategory = restaurant.category.trim().includes(keyword)
        return searchByName || searchByCategory
      })
      res.render('index', { restaurants: filteredRestaurant, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router