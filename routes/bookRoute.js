const bookController = require("../controllers/bookController")
const express = require("express")
const router = express.Router()

router.get("/", bookController.getAllBooks)
router.get("/:id", bookController.getBookDetailsByid)
// router.get("/category", bookController.getBookByCategoryId)

module.exports = router
