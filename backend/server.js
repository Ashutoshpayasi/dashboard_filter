const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const port=8080
dotenv.config()
const app = express()
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on("connected", () => {
    console.log("mongodb connnected successfully")
})
mongoose.connection.on("error", () => {
    console.log("mongodb connection faild")
})

app.use(require("./Route/Route"))

app.listen(port, () => {
    console.log("listening on port 8080")
})

