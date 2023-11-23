const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db");
const notFound = require("./middleware/rotaNaoEncontrada");
const authRotas = require("./routes/authRotas");
const errorHandler = require("./middleware/errorInterno");
const PORT = process.env.PORT || 5000;
const app = express();

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.get("/", (req, res) => {
    res.send("Oĺa recrutador")
});
app.use("/api", authRotas);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("O servidor está rodando na porta: ${PORT}")
})