const db = require("../models")
const { Op } = require("sequelize")

const Book = db.Book

const bookController = {
    getAllBooks: async (req, res) => {
        try {
            const {
                title = "",
                author = "",
                genre = "",
                _sortBy = "id",
                _sortDir = "ASC",
                _limit = 12,
                _page = 1,
                CategoryId = 0,
            } = req.query

            if (CategoryId) {
                const getAll = await Book.findAndCountAll({
                    limit: Number(_limit),
                    offset: (_page - 1) * _limit,
                    include: [{ model: db.Category }],
                    order: [[_sortBy, _sortDir]],
                    where: {
                        CategoryId: CategoryId,
                    }
                })

                return res.status(200).json({
                    message: `Get all books`,
                    data: getAll.rows,
                    dataCount: getAll.count,
                })
            }

            if (
                _sortBy === "title" ||
                _sortBy === "author" ||
                _sortBy === "publish_date" ||
                _sortBy === "genre" ||
                genre ||
                author ||
                title ||
                CategoryId
            ) {
                console.log(req.query)
                const getAll = await Book.findAndCountAll({
                    limit: Number(_limit),
                    offset: (_page - 1) * _limit,
                    include: [{ model: db.Category }],
                    order: [[_sortBy, _sortDir]],
                    where: {
                        [Op.and]: [
                            {
                                author: {
                                    [Op.like]: `%${author}%`,
                                },
                            },
                            {
                                title: {
                                    [Op.like]: `%${title}%`,
                                },
                            },
                            {
                                genre: {
                                    [Op.like]: `%${genre}%`,
                                },
                            },
                        ],
                    },
                })
                return res.status(200).json({
                    message: `Get all books`,
                    data: getAll.rows,
                    dataCount: getAll.count,
                })
            }

            const getAllBooks = await Book.findAndCountAll({
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
                include: [{ model: db.Category }],
            })

            return res.status(200).json({
                message: "Get all books",
                data: getAllBooks.rows,
                dataCount: getAllBooks.count,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error",
            })
        }
    },
    getBookDetailsByid: async (req, res) => {
        try {
            const { id } = req.params

            const findBookById = await Book.findByPk(id, {
                include: [{ model: db.Category }],
            })

            return res.status(200).json({
                message: "Get book details",
                data: findBookById
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error",
            })
        }
    },
    // getBookByCategoryId: async (req, res) => {
    //     try {
    //         const getAllBooks = await db.Category.findAll()

    //         return res.status(200).json({
    //             message: "Get all books",
    //             data: getAllBooks

    //         })
    //     } catch (err) {
    //         console.log(err)
    //         return res.status(500).json({
    //             message: "Server error",
    //         })
    //     }
    // }
}


module.exports = bookController
