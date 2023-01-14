const port=5555;

let mongoose = require('mongoose');

// Mongoose
const connectionUrl = 'mongodb://localhost:27017/tradedb';

mongoose.connect(connectionUrl, {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});

let tradeSchema = new mongoose.Schema({
    "symbol": String,
    "price": String,
    "quantity": String,
    "timestamp": Number
});

let Trade = mongoose.model("trades",tradeSchema);

const WebSocket = require('ws');
const binanceUrl= 'wss://stream.binance.com:9443/ws/btcusdt@trade';
const ws = new WebSocket(binanceUrl);

// socket.io
let express= require('express');
let sockets = [];
let app = express();
let server = app.listen(port);
let io= require('socket.io').listen(server);
io.on('connection', (socket)=> {
    sockets.push(socket);
    console.log("New client connected!");
    socket.on('disconnect', () => {
        let index = sockets.indexOf(socket);
        sockets.splice(index,1);
    } );
});
// {"e":"trade","E":1673694422129,"s":"BTCUSDT","t":2483619779,"p":"20544.84000000","q":"0.00600000","b":17330712447,"a":17330712435,"T":1673694422129,"m":false,"M":true}
ws.on("message", data => {
    let frame= JSON.parse(data);
    let model = {
        "symbol": frame.s,
        "price": frame.p,
        "quantity": frame.q,
        "timestamp": frame.E
    } ;
	console.log(model);
    let trade = new Trade(model);
    trade.save((err,t) => {
         if (err) console.error(err);
    });
    sockets.forEach( socket => {
        socket.emit('ticker',model);
    })
});