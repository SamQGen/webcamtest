<template>
  <video autoplay></video>
  <button type="button" @click="clicked">Click Me!</button>
  <textarea id="w3review" name="w3review" v-model="textArea">
    dummyText
</textarea>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// import mediasoup from 'mediasoup'
const socket = new WebSocket('ws://localhost:8080');
const textArea = ref('')
const clicked = () => {
  socket.send(textArea.value)
}

onMounted(() => {

  socket.onmessage = ({data}) => {
    console.log(`message from server ` , data);
  }

  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];
        const peer = new mediasoup.Peer();
        const transport = peer.createTransport({
          kind: 'webrtc',
          rtcConfiguration: {
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
          }
        });
        const producer = transport.produce({ track: videoTrack });
        producer.on('track', (track) => {
          console.log(`Sending video track over WebSocket ${track}`);
        });
      })
      .catch((err) => {
        console.error(err);
      });



  // navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  //   const video = document.querySelector('video');
  //   video.srcObject = stream;
  //   console.log('information about stream '  , stream.getVideoTracks());
  //   video.onloadedmetadata = () => {
  //     const videoTracks = stream.getVideoTracks()
  //     // video.play();
  //     // socket.send(stream)
  //     console.log('this is the stream ' , stream)
  //     const peer = new RTCPeerConnection();
  //     peer.addTrack(videoTracks[0]);
  //
  //     peer.ontrack = e => {
  //       console.log('sending ' , e.streams[0])
  //       socket.send(e.streams[0]);
  //     };
  //   };
  // });
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
