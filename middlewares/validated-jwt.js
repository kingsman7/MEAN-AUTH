const { request, response } = require("express");
const jwt = require('jsonwebtoken')

/**
 * If the request has an Authorization header, then verify the token and add the uid and name to the
 * request object.
 * @param [req] - request
 * @param [res] - response
 * @param next - a function that you call to pass control to the next middleware function.
 * @returns the response object.
 */
const validatorJWT = (req = request, res = response, next) => {
 /* Getting the Authorization header from the request. */
  const Authorization = req.header('Authorization')
  
 /* Checking if the request has an Authorization header. If it does not, then it returns a 401 status
 code and a message. */
  if (!Authorization) {
    return res.status(401).json({
      ok: false,
      msg: "token: token missing"
    })
  }

  try {
    /* Verifying the token and adding the uid and name to the request object. */
    const { uid, name } = jwt.verify(Authorization, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name = name
  } catch (error) {
    /* Returning a 401 status code and a message. */
    return res.status(401).json({
      ok: false,
      msg: "authorization: Unauthorized"
    })
  }

  /* Passing control to the next middleware function. */
  next();
}

module.exports = {
  validatorJWT
}