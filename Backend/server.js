import express from "express"

const app = express()
const PORT = 9000

app.listen(PORT, ()=>console.log(`Server now connected to ${PORT}`))

