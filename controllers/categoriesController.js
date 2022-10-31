const db = require("../models")

const categoriesController = {
    getBookByCategoryId: async (req, res) => {
        try {
            const { id } = req.query

            const findBookByCategory = await db.Category.findAll({
                where: {
                    id: id
                },
                include: [{ model: db.Book }],
            })

            return res.status(200).json({
                message: "Get book details",
                data: findBookByCategory
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error",
            })
        }
    }
}


module.exports = categoriesController