if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

//import npm libraries
const express = require('express');
const app = express()
const bcrypt = require('bcrypt') //importing bcrypt package
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require("method-override")

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
  )

const users = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method")) 

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
          id: Date.now().toString(), 
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
      })
      console.log(users); // Display newly registered in the console
      res.redirect("/login")
      
  } catch (e) {
      console.log(e);
      res.redirect("/register")
  }
})

// Routes
app.get('/', checkAuthenticated, (req, res) => {
  res.render("index.ejs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render("register.ejs")
})
// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
  req.logout(req.user, err => {
      if (err) return next(err)
      res.redirect("/")
  })
})

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return res.redirect("/")
  }
  next()
}

app.listen(5500)
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const knex = require('knex');

// // Configure database connection
// const db = knex({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: 'your_database_password',
//     database: 'mydatabase'
//   }
// });

// const app = express();

// // Apply middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Serve static files from public directory
// app.use(express.static('public'));

// // Registration endpoint
// app.post('/register-user', (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   db('users').insert({
//     name: name,
//     email: email,
//     password: password // Note: In production, you should hash the password before storing it.
//   }).returning('*')
//     .then(user => {
//       res.json({ user: user[0] });
//     })
//     .catch(error => {
//       if (error.code === '23505') { // Unique violation
//         res.status(409).json({ error: 'Email already exists' });
//       } else {
//         res.status(500).json({ error: 'Database error' });
//       }
//     });
// });

// // Set the port and start server
// const PORT = process.env.PORT || 5500;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
 
