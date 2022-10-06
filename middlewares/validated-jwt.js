const { request, response } = require("express");
const jwt = require('jsonwebtoken')

const validatorJWT = (req = request, res = response, next) => {
  const Authorization = req.header('Authorization')
  if (!Authorization) {
    return res.status(401).json({
      ok: false,
      msg: "token: token missing"
    })
  } 
  
  try {
    const {uid, name} = jwt.verify(Authorization, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "authorization: Unauthorized"
    })
  }
  
  next();
}

module.exports = {
  validatorJWT
}