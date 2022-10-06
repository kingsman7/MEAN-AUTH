const jwt = require('jsonwebtoken')


const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '6h'
    }, (err,token) => {
      if (err) {
        console.log('❌ error JWT:', err);
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  generateJWT
}