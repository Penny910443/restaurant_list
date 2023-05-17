const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
  console.log('done')
})