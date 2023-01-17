<template>
  <video autoplay></video>
</template>

<script setup>
import {onMounted} from "vue";

onMounted(() => {
  const socket = new WebSocket('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');

  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      console.log('this is the stream ' , stream)
      const peer = new RTCPeerConnection();
      peer.addStream(stream);

      peer.ontrack = e => {
        console.log('sending ' , e.streams[0])
        socket.send(e.streams[0]);
      };
    };
  });
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
