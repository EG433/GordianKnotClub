const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { Client } = require('pg')

const con = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'qazwsx',
  database: 'clubdata'
})

con.connect()

function initialize(passport) {
  // Function to authenticate users
  const authenticateUser = async (email, password, done) => {
    try {
      // Get users by email
      const result = await con.query('SELECT * FROM usertable WHERE email = $1', [email])
      const user = result.rows[0]
      
      if (user == null) {
        return done(null, false, { message: "No user found with that email" })
      }
      
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: "Password incorrect" })
        }
      } catch (e) {
        return done(e)
      }
    } catch (e) {
      console.log(e)
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  
  passport.serializeUser((user, done) => done(null, user.id))
  
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await con.query('SELECT * FROM usertable WHERE id = $1', [id])
      const user = result.rows[0]
      done(null, user)
    } catch (e) {
      done(e)
    }
  })
}

module.exports = initialize
