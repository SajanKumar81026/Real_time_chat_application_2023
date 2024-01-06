
const express = require('express');
const app = express();
const http=require('http');
const server=http.createServer(app);
const { Server } = require("socket.io");
const io= new Server(server);
const path=require('path');
const nePath=path.join(__dirname, "../index.html");
app.get('/', (req, res) => {
    res.sendFile('');
});


const users={};

io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        // console.log("new-user", name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);

    });
    socket.on('send', message=>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


});
server.listen(8001, ()=>console.log(`Server started at port:8000`))
// httpServer.listen(8000);
