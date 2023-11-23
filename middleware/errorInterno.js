const errorHandler = (err, req, res, next) => {
    try {
      const statusCode = res.statusCode || 500;
  
      res.status(statusCode).json({
        status: false,
        message: err?.message || 'Erro interno do servidor',
        stack: err?.stack || null,
      });
    } catch (error) {
      // Tratar qualquer erro que possa ocorrer ao lidar com a resposta de erro.
      next(error);
    }
  };
  
  module.exports = errorHandler;
  