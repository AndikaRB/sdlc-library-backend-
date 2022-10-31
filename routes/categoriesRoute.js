const express = require("express")
const categoriesController = require("../controllers/categoriesController")
const { getBookByCategoryId } = require("../controllers/categoriesController")

const router = express.Router()

router.get('/', categoriesController.getBookByCategoryId)

module.exports = router