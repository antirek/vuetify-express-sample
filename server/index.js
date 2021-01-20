const express = require('express');
const config = require('config');
const path = require('path');
const favicon = require('serve-favicon')
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const db = mongoose.connect(config.mongodb, { 
  useNewUrlParser: true,
  createIndexes: true,
});

const {Item, User} = require('./models');
const session = require('./session');

const app = express();
app.use(express.json());
app.use(cors())

app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'pug');
app.use('/static',
    express['static'](path.join(__dirname, './../node_modules')));

app.use('/public',
    express['static'](path.join(__dirname, './../client')));

app.use('/img',
    express['static'](path.join(__dirname, './../client/dist/img')));
    //app.use(favicon(path.join(__dirname, './../client/dist/', 'favicon.ico')))

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/dist/app.js'));
})

app.get('/css/app.css', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/dist/css/app.css'));
})

app.get('/fonts/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/dist/fonts', req.params.filename));
});

const getActiveSession = async (token) => {
  console.log({token})
  const userId = await session.get(token);
  return userId;
}

const getUser = async (id) => {
  console.log({id})
  return await User.findOne({_id: id});
}

const prepare = async (req, res, next) => {
  const token = req.headers['api-token'];
  if (!token) {next()}
  const userId = await getActiveSession(token);
  if (!userId) {next()}
  const user = await getUser(userId);
  req.user = user;
  next();
}

app.get('/', (req, res) => {
  //res.render('layout');
  const file = fs.readFileSync(path.join(__dirname, '../client/dist/index.html'));
  const q = file.toString();
  const ready = q.replace(new RegExp('{{baseUrl}}', 'g'), config.baseUrl);
  res.send(ready);
})

app.get('/me', prepare, (req,res) => {
  console.log('user', req.user);

  const {username, title, phone} = req.user;
  res.json({username, title, phone});
});

app.post('/login', async (req, res) => {
  console.log('req', req.body);

  const user = await User.findOne({username: req.body.username});
  console.log('user', user);
  if(!user) {
    res.sendStatus(403);
    return;
  }

  if (user.password === req.body.password) {
    console.log('password: ok');
    const token = uuidv4();
    session.set(token, user._id.toString());
    
    res.json({status: 'OK', token});
  } else {
    res.sendStatus(403);
  }
});

app.get('/items', async (req, res)=>{
  const items = await Item.find({});
  console.log({items});
  if(!items || items.length === 0) {
    res.sendStatus(404);
    return;
  }
  res.json(items);
});

app.get('/items/:id', async (req, res)=>{
  const id = req.params.id;
  const item = await Item.findOne({_id: id});
  console.log({item});
  if(!item) {
    res.sendStatus(404);
    return;
  }
  res.json(item);
});

app.get('/items/getByShort/:short', async (req, res)=>{  
  const short = req.params.short;
  console.log('GET by short', short);
  const item = await Item.findOne({short});
  console.log({item});
  if(!item) {
    res.sendStatus(404);
    return;
  }
  res.json(item);
});


app.delete('/items/:id', async (req, res)=>{
  const id = req.params.id;
  const item = await Item.deleteOne({_id: id});
  res.sendStatus(200);
});

app.post('/items/', async (req, res)=>{
  const body = req.body;

  const item = new Item(body);
  const savedItem = await item.save();
  console.log({savedItem});
  if(!savedItem) {
    res.sendStatus(500);
    return;
  }
  res.json(savedItem);
});

app.put('/items/:id', async (req, res)=>{
  const id = req.params.id;
  const body = req.body;

  const item = await Item.findOneAndUpdate({_id: id}, body, {
    returnOriginal: false,
  });
  console.log({item});
  if(!item) {
    res.sendStatus(404);
    return;
  }
  res.json(item);
});

app.listen(config.port, () => {
  console.log('started', config);
});
