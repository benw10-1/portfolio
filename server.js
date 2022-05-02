const express = require("express")

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static(__dirname + "/docs"))

const indexRoutes = require("./routes/routes")

app.use("", indexRoutes)
app.get('*', function(req, res) {
    res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
