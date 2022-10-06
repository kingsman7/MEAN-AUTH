const { request, response } = require("express");
const { validationResult } = require("express-validator");

/**
 * If there are errors, return a 400 status code with the errors. Otherwise, continue to the next
 * middleware.
 * @param [req] - request
 * @param [res] - response
 * @param next - This is a function that is called when the middleware is complete.
 * @returns The errors object is being returned.
 */
const validateFile = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      error: errors.mapped()
    })
  } next();
}

module.exports = {
  validateFile
}