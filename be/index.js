const WebSocket = require('ws')
const fs = require('fs');
const server = new WebSocket.Server({port:'8080'})
let outerSocket = null;
let timesRun =0;
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
server.on('connection' , socket => {
  socket.on('message',message =>{
    let content =JSON.parse(message.toString())
    console.log('got message ' , JSON.parse(message.toString()));
    console.log('this is the random number ' , content.random);
    fs.writeFile('test.txt', content.data, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
    let data = content.data.replace(/^data:image\/\w+;base64,/, "");
    let buf = new Buffer(data, 'base64');
    fs.writeFile('image.png', buf,err => {
      console.log(err);});

    // let interval = setInterval(()=> getSelPos(socket), 500);
    // if (timesRun > 5){
    //   clearInterval(interval)
    // }
    let randomint = {random:randomInteger(1,5)}

    socket.send(JSON.stringify(randomint))
    // socket.send(`Recieved our message: ${message}`)
  })


  socket.on('error', error => {
    console.log(`this is our error ${error}`);
  })
})

const getSelPos = async(ws) =>{
  ws.send(`dummy ${timesRun}`)
  timesRun +=1
  // Use socket instance
}
