<template>
  <video autoplay></video>
  <button type="button" @click="clicked">Click Me!</button>
  <img :src="imageEl" alt="" v-if="imageEl"/>
  <textarea id="w3review" name="w3review" v-model="textArea">

    dummyText
</textarea>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
// import mediasoup from 'mediasoup'
const socket = new WebSocket('ws://localhost:8080');
let imageEl = ref('')
let interval = ref('')
const textArea = ref('')
let count = 0;
const clicked = () => {
  socket.send(textArea.value)
}

watch(imageEl,  () => {
  console.log('this is nv and ov ' );
  count +=1
  console.log(count);
  socket.send(`${imageEl.value}`)
})

const getImage = (track) => {
  console.log('this is the get image thing');
  let imageCapture = new ImageCapture(track);
  imageCapture.takePhoto().then(img => {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = function () {
      let base64data = reader.result;
      imageEl.value = base64data;
    };
  });
}
// let chunks = []
onMounted(() => {
  socket.onmessage = ({data}) => {
    console.log(`message from server ` , data);
  }
  navigator.mediaDevices.getUserMedia({video: true})
      .then((mediaStream) => {
        document.querySelector('video').srcObject = mediaStream
        const track = mediaStream.getVideoTracks()[0];
        interval = setInterval(() => getImage(track),500)
        // let imageCapture = new ImageCapture(track);
        // imageCapture.takePhoto().then(img => {
        //     let reader = new FileReader();
        //     reader.readAsDataURL(img);
        //     reader.onloadend = function () {
        //       let base64data = reader.result;
        //       imageEl.value = base64data;
        //     };
        // });

      })
      .catch((error) => console.error(error));
    // navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    //   const video = document.querySelector('video');
    //   video.srcObject = stream;
    //   console.log('information about stream '  , stream.getVideoTracks());
    //   const mediaRecorder = new MediaRecorder(stream);
    //   mediaRecorder.start();
    //   mediaRecorder.ondataavailable = (e) => {
    //     console.log('this is the thing? ');
    //     chunks.push(e.data);
    //   };
      // video.onloadedmetadata = () => {
      //   const videoTracks = stream.getVideoTracks()
      //   // video.play();
      //   // socket.send(stream)
      //   console.log('this is the stream ' , stream)
      //   const peer = new RTCPeerConnection();
      //   peer.addTrack(videoTracks[0]);
      //
      //   peer.ontrack = e => {
      //     console.log('sending ' , e.streams[0])
      //     socket.send(e.streams[0]);
      //   };
      // };
  onUnmounted(()=>{
    clearInterval(interval.value)
  })

})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
