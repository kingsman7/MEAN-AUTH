const mongoose = require("mongoose")

/**
 * This function will connect to the database and if it fails, it will throw an error.
 */
const dbConnection = async() => {
  try {
    /* Connecting to the database. */
    await mongoose.connect(process.env.DB_CNN)
    console.log("🚀 DB Online")
  } catch (error) {
    console.log(" ❌ ~ file: config.js ~ line 5 ~ dbConnection ~ error", error)
    throw new Error('Error when update db')
  }
}

module.exports = {
  dbConnection
}