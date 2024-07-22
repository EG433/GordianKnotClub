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

const {Client} = require('pg')

const con = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'qazwsx',
  database: 'clubdata'
})

con.connect().then(() => console.log('connected'))

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

// Register route
app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }
    
    const insertQuery = 'INSERT INTO usertable (name, email, password) VALUES ($1, $2, $3) RETURNING *'
    const values = [newUser.name, newUser.email, newUser.password]
    
    const result = await con.query(insertQuery, values)
    console.log(result.rows[0]) // Display newly registered user in the console
    
    res.redirect("/login")
  } catch (e) {
    console.log(e)
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

const path = require('path');

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/performance', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Performance.html'));
});

app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'posts.html'));
});

app.get('/strategy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'strategy.html'));
});

app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Team.html'));
});

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

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
