const express = require("express")

const PORT = 3001
const app = express()

app.use(express.static(__dirname + "/statics"))

const indexRoutes = require("./routes/routes")

app.use("", indexRoutes)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});