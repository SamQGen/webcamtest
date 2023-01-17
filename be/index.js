const WebSocket = require('ws')
const server = new WebSocket.Server({port:'8080'})
let outerSocket = null;
server.on('connection' , socket => {
  socket.on('message',message =>{
    console.log('got message ' , message.toString());
    let interval = setInterval(()=> getSelPos(socket), 2000);
    // socket.send(`Recieved our message: ${message}`)
  })


  socket.on('error', error => {
    console.log(`this is our error ${error}`);
  })
})

const getSelPos = async(ws) =>{
  ws.send('dummy')
  // Use socket instance
}
