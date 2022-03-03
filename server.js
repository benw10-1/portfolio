const express = require("express")

const PORT = 3001
const app = express()

app.use(express.static('statics'))

app.get("/", (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});