const WebSocket = require('ws')
const server = new WebSocket.Server({port:'8080'})
let outerSocket = null;
server.on('connection' , socket => {
  // socket.on('message',message =>{
  //   console.log('got message ' , message.toString());
  //   // socket.send(`Recieved our message: ${message}`)
  // })


  socket.on('error', error => {
    console.log(`this is our error ${error}`);
  })
})
setTimeout(()=>{
  server.on('connection', socket =>{
    console.log('got our message' , socket);
  })
  // socket.send('dummy callback after 5 seconds')
},3000)

