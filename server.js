const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express()

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log(err)
    }
  })
  next()
})

app.use((req,res,next)=>{
  res.render('bad.hbs')
})

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
})

app.get('/',(req,res)=>{
  // res.send('<h1>radiiimoo</h1>')
  res.render('home.hbs',{
    pageTitle:'Main Page',
    currentYear: new Date().getFullYear(),
    welcome: 'Hi you are on main page'
  })
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad',(req,res)=>{
  res.send({
    msg:'bad request',
    status: '3012'
  })
})

app.listen(3001, ()=>{
  console.log('server is up')
})

