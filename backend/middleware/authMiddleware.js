function authorizeRequest(req, res, next) {
    // Optional: You could verify some token if needed.
    console.log('Request authorized');
    next();
  }
  
  module.exports = { authorizeRequest };