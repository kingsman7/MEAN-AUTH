const { request, response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = ('/new', async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    /* This is a query to the database to see if the email already exists. If it does, it returns a 400
    error. */
    let user = await User.findOne({ email: email })

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: `duplicate: Email ${email} already exists`
      })
    }

    /* Creating a new user with the data that is being sent in the request body. */
    const dbUser = new User(req.body)

    /* Encrypting the password. */
    const salt = bcrypt.genSaltSync()
    dbUser.password = bcrypt.hashSync(password, salt)

    /* Generating a token for the user. */
    const token = await generateJWT(dbUser._id, name)
    console.log("🚀 ~ file: auth.js ~ line 30 ~ createUser ~ token", token)

    /* Saving the user in the database. */
    await dbUser.save();

    /* This is a response to the client. It is a 201 status code, which means that the user was created
    successfully. */
    return res.status(201).json({
      ok: true,
      mgs: `created user: User ${name} created success`,
      token,
      name
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'error: fail connections'
    })
  }

})

const login = ('/', async (req = request, res = response) => {
  const { email, password } = req.body
  try {

    /* Creating a new user with the data that is being sent in the request body. */
    let dbUser = await User.findOne({ email })

    /* This is a query to the database to see if the email already exists. If it does, it returns a 400
    error. */
    if (!dbUser) {
      res.status(400).json({
        ok: false,
        msg: 'no email: This email dont exist'
      })
    }

    /* Comparing the password that the user is sending in the request body with the password that is
    stored in the database. */
    const validatorPassword = bcrypt.compareSync(password, dbUser.password)

    /* This is a conditional that compares the password that the user is sending in the request body
    with the password that is stored in the database. If the password is not correct, it returns a
    400 error. */
    if (!validatorPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password:The password is not correct"
      })
    }

    /* Generating a token for the user. */
    const token = await generateJWT(dbUser._id, dbUser.name)

    /* This is a response to the client. It is a 200 status code, which means that the user was logged
    in successfully. */
    return res.json({
      ok: true,
      msg: 'Login de usuario',
      name: dbUser.name,
      token
    })
  } catch (error) {
    console.log("❌ error", error);
    /* This is a response to the client. It is a 500 status code, which means that there was an error
    in the server. */
    return res.status(500).json({
      ok: false,
      msg: 'error: fail connections'
    })
  }
})

const renewToken = ('/renew', async (req = request, res = response) => {

  const {uid, name} = req

  const token = await generateJWT(uid, name) 

  return res.json({
    ok: true,
    msg: 'Renew',
    token
  })
})

module.exports = {
  createUser,
  login,
  renewToken
}