const express = require('express');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session');
const { session } = require('passport');
require('./passport-setup');

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'login-session',
    keys: ['key1', 'key2']
  }))
//middleware 
  const isLoggedIn = (req, res, next) =>{
      if(req.user){
          next()
      }else{
          res.sendStatus(401);
      }
}
//inicializando cookies
app.use(passport.initialize());
app.use(passport.session());
//rotas
app.get('/', (req, res) => res.send('Voce ainda nao logou'))
app.get('/failed', isLoggedIn, (req,res)=>res.send('Falha no login!'))
app.get('/success', isLoggedIn, (req,res)=>res.send('Bem vindo '+req.user.displayName+'!'))
//trabalhando com passport, rota de autenticação e redirecionamento após login 
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Autenticação feita com sucesso, redirecionar a pagina Home
    res.redirect('/success');
  });
app.get('/logout', (req, res)=>{
    console.log(session)
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () =>console.log('app rodando na porta 3000'))