const express = require("express")

const PORT = 3001
const app = express()

app.use(express.static(__dirname + "/statics"))

app.get("/", (req, res) => {
    console.log("GOT")
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});