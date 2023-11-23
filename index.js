const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Oĺa recrutador")
})

app.listen(PORT, () => {
    console.log("O servidor está rodando na porta: ${PORT}")
})