const jwt = require('jsonwebtoken')

/**
 * It takes a user id and a user name, and returns a promise that resolves to a JWT token.
 * @param uid - user id
 * @param name - 'John Doe'
 * @returns A promise that resolves to a token.
 */
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