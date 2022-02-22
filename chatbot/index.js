const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose')
require('./models/keymsg')
const key = mongoose.model("keys")
require('./models/db')
const msg = mongoose.model('msgs')


mongoose.connect("mongodb+srv://MagoDayvison:magomanda@cluster0.mtyeu.mongodb.net/chatbot?retryWrites=true&w=majority")
//handlebars 
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//body-parser
const bodyParser = require('body-parser');

const { text, json } = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/enviar/:by/:from/:msg",(req,res)=>{
var messag={
  by:req.params.by,
  from:req.params.from,
message:JSON.stringify(req.params.msg)
}

new msg(messag).save().then(console.log('adicionada a mensagem'))
})
app.get('/chat/:by/:from',(req,res)=>{
  var by = req.params.by;
  var from = req.params.from;
  res.render('chat',{by:by,from:from})
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(8002, console.log('rodando com sucesso'))