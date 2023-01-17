<template>
  <video autoplay></video>
  <button type="button" @click="clicked">Click Me!</button>
  <img :src="imageEl" alt="" v-if="false"/>
  <textarea id="w3review" name="w3review" v-model="textArea" />
  <h3>{{calculatedMatch}}</h3>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
const socket = new WebSocket('ws://localhost:8080');
let imageEl = ref('')
let interval = ref('')
const textArea = ref('')
const randomIntFromServer = ref('')
const generateRandom = () => {
  return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
}
const randomIntLocal = generateRandom()
const calculatedMatch = computed(()=>{
  return randomIntFromServer.value === randomIntLocal ? true : false
})


const clicked = () => {
  socket.send(textArea.value)
}

watch(imageEl,  (nv) => {
  let obj = {data:nv,test:'test',random:randomIntLocal}
  socket.send(JSON.stringify(obj))
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
onMounted(() => {
  socket.onmessage = ({data}) => {
    randomIntFromServer.value=JSON.parse(data).random
    console.log(`message from server ` , JSON.parse(data));
  }
  navigator.mediaDevices.getUserMedia({video: true})
      .then((mediaStream) => {
        document.querySelector('video').srcObject = mediaStream
        const track = mediaStream.getVideoTracks()[0];
        // getImage(track)
        interval = setInterval(() => getImage(track),500)
      })
      .catch((error) => console.error(error));
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
