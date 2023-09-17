<script setup>
import {ref, onUpdated, onMounted} from "vue";
import axios from "axios";
import {layer} from "@layui/layui-vue";

const loading = ref(true);
 const root = "/api/v1"

 const props = defineProps({
     user_id: String,
     chatroom_id: String
 })

const chatroom_name = ref("")
 const chatroom_member_count = ref(0)
 const input_text = ref("")
 const msg_id = ref({})
 const old_msg_id = ref({})
 const msgs = ref([])

 function receiveMessage() {
     axios.get(root + "/chatroom/" + props.chatroom_id + "/chat" + "?offset=" + 100 + "&message_id=" + old_msg_id.value[props.chatroom_id]).then(function (response) {
	 if (response.data.status === 0 || response.data.status === 200) {
	  let message = response.data.data.message
	  msgs.value = message
      } else {
	  layer.msg("Cannot find the chatroom!")
    }
  })     
 }

 function sendMessage() {
  if (input_text.value === "") {
    layer.msg("Please enter your message!")
  } else {
      axios.post(root + "/chatroom/" + props.chatroom_id + "/chat", {
	  "user_id": props.user_id,
	  "message": input_text.value
      }).then(function (response) {
	if (response.data.status === 0 || response.data.status === 200) {
        input_text.value = ""
      } else {
        layer.msg("Cannot send the message!")
      }
    })
  }
}

function updateInfo() {
     axios.get(root + "/chatroom/" + props.chatroom_id + "?user_id=" + props.user_id).then(function (response) {
	 if (response.data.status === 0 || response.data.status === 200) {
      loading.value = false
      chatroom_name.value = props.chatroom_id
	chatroom_member_count.value = response.data.data.memberCount
	msg_id.value[props.chatroom_id] = response.data.data.lastMessageId
	if (!old_msg_id.value.hasOwnProperty(props.chatroom_id)) {
	    old_msg_id.value[props.chatroom_id] = response.data.data.lastMessageId	    
	} else {
	    console.log(old_msg_id.value[props.chatroom_id])
	}
	msgs.value = []
	receiveMessage()
    } else {
      layer.msg("Cannot find the chatroom!")
    }
  })

 }

 function isSystemUser(msg) {
     msg.senderName === "SYSTEM"
 }

onUpdated(() => {
  updateInfo()
})

onMounted(() => {
     updateInfo()
     window.setInterval(() => {
	 receiveMessage()
     }, 500)
 })

</script>

<template>
  <div style="height: 100vh; width: 100%">
    <lay-header class="chat_header layui-anim-down">
      {{ chatroom_name + " (" + chatroom_member_count + ")" }}
    </lay-header>
    <lay-scroll thumbColor="#666" style="height: 86vh" class="layui-anim-up">
      <lay-skeleton :rows="30" :loading="loading" animated>
	  <lay-field v-for="message in msgs" :key="message.id" :title="message.senderName" class="isSystemUser(message) ? 'system-message' : 'regular-message'">
	      {{ message.payload }}
	  </lay-field>
      </lay-skeleton>
    </lay-scroll>
    <lay-row class="layui-anim-up">
      <lay-input fluid v-on:keyup.enter="sendMessage" style="height: 7vh; width: 80%" placeholder="Enter Your Text Here..." v-model="input_text" />
      <lay-button type="primary" @click="sendMessage" fluid style="height: 7vh; width: 20%">
        Send
      </lay-button>
    </lay-row>
  </div>

</template>

<style scoped>
.chat_header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  height: 7vh;
  line-height: 7vh;
  background-color: white;
  color: black;
 }

 .layui-field {
     border-color: black;
 }

 .system-message
 .regular-message {
     width: 90vw;
     margin-left: 1em;
 }

 .system-message {
     border-color: green;
 }
</style>
