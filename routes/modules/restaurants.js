const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findByIdAndUpdate(restaurant_id, req.body)
    .then(() => res.redirect(`/restaurants/${restaurant_id}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router