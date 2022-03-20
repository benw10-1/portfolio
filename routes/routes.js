var express = require("express")
var router = express.Router()
var path = require('path')

router.get("/api/getProjects", (req, res) => {
    console.log("GOT PROJ")
    res.sendFile(path.join(__dirname.replace("routes", "helpers"), '/projects.json'))
})

module.exports = router