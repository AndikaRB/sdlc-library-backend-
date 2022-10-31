const express = require("express")
const { testController } = require("../controllers/testController")

const router = express.Router()

router.get("/", testController.testUjian1)
router.post("/", testController.testUjian2)

module.exports = router