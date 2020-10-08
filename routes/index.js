var express = require('express')
var router = express.Router()

/* GET home page route. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Mongodb-Express-Angular-Node-ToDo' })
})

module.exports = router