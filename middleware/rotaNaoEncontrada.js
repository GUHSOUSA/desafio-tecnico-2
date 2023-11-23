// case route not exist show a message saying route not exist

const notFound = (req, res, next) => {
    const error = `Rota não encontrada ${req.originalUrl}`
    res.status(400);
    next(error);
};

module.exports = notFound;