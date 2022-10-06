const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFile } = require('../middlewares/validated-field');
const { validatorJWT } = require('../middlewares/validated-jwt');

const router = Router();

/* Creating a new user. */
router.post('/new',[
  check('name', 'name: Name is required').not().isEmpty().isLength({min:3}),
  check('email', 'email: Email is required').isEmail(),
  check('password', 'password: Password is required').isLength({min:8}),
  validateFile
], createUser)

/* Creating a new route for the login. */
router.post('/', [
  check('email', 'email: Email is required').isEmail(),
  check('password', 'password: Password is required').isLength({ min: 8 }),
  validateFile
], login)

/* A route to renew the token. */
router.get('/renew',[
  validatorJWT
], renewToken)

module.exports = router;