<script setup>
import {ref, onUpdated, onMounted} from "vue";
import axios from "axios";
import {layer} from "@layui/layui-vue";

const loading = ref(true);

const props = defineProps({
  user_id: String,
  chatroom_id: String
})

const chatroom_name = ref("")
 const chatroom_member_count = ref(0)

 function updateInfo() {
     axios.get("http://172.29.146.39:8080/chatroom/" + props.chatroom_id + "?user_id=" + props.user_id).then(function (response) {
	 if (response.data.status === 0 || response.data.status === 200) {
	     loading.value = false
	     chatroom_name.value = response.data.data.name
	     chatroom_member_count.value = response.data.data.memberCount
	     console.log(chatroom_name)
	 } else {
	     layer.msg("Cannot find the chatroom!")
	 }
     })     

 }

 onUpdated(() => {
     updateInfo()
 })

 onMounted(() => {
     updateInfo()
 })

</script>

<template>
  <div style="height: 100vh; width: 100%">
    <lay-header class="chat_header layui-anim-down">
      {{ chatroom_name + " (" + chatroom_member_count + ")" }}
    </lay-header>
    <lay-scroll thumbColor="#666" style="height: 86vh" class="layui-anim-up">
      <lay-skeleton :rows="30" :loading="loading" animated>
      </lay-skeleton>
    </lay-scroll>
    <lay-row class="layui-anim-up">
      <lay-input fluid style="height: 7vh; width: 80%" placeholder="Enter Your Text Here..."/>
      <lay-button type="primary" @click="loading = !loading" fluid style="height: 7vh; width: 20%">
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
</style>
