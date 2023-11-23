const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token inválido, Acesso negado" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified.id;
    req.token = token;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ mensagem: "Sessão inválida" });
    } else {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }
  }
});

module.exports = auth;
