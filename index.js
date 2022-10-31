const express = require("express")
const dotenv = require("dotenv")
const db = require("./models")
const cors = require("cors")
const fs = require("fs")
const handlebars = require("handlebars")
const authRoute = require("./routes/authRoute")
const bookRoute = require("./routes/bookRoute")
const cartRoute = require("./routes/cartRoute")
const transactionRoute = require("./routes/transactionRoute")
const adminRoute = require("./routes/adminRoute")
const categoriesRoute = require("./routes/categoriesRoute")
const { verifyToken } = require('./middlewares/authMiddleware')
const testRoute = require("./routes/testRoute")

dotenv.config()

const PORT = 2000

const app = express()

app.use(cors())
app.use(express.json())


app.use("/auth", authRoute)
app.use("/books", bookRoute)
app.use("/carts", verifyToken, cartRoute)
app.use("/transactions", verifyToken, transactionRoute)
app.use("/admin", adminRoute)
app.use("/categories", categoriesRoute)
app.use("/test", testRoute)

app.listen(PORT, async () => {
    db.sequelize.sync({ alter: true })
    console.log("Listening in Port", PORT)
})
