
const testController = {
    testUjian1: async (req, res) => {
        try {
            res.send("connected")
        } catch (err) {
            console.log(err)
        }
    },
    testUjian2: async (req, res) => {
        try {
            res.send("connected two")
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    testController
}