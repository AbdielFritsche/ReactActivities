const { request } = require("express")

const app = request


app.get("/",(req,res) => res.send("Hola mundo desde API"))
console.log("Hola mundo")
