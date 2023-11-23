const mongoose = require("mongoose");

const dbConnect = () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexâo com o banco de dados feita com sucesso")
    }catch (error) {
        console.error(error);
    }
}
module.exports = dbConnect;