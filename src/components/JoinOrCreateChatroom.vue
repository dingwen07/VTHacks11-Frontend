<script setup>
import {ref} from "vue";
import axios from "axios";
import {layer} from "@layui/layui-vue";

const props = defineProps({
     user_id: String
 })

 const root = "http://172.29.114.14:8080"

 const code = ref("")

 function joinOrCreate() {
  if (code.value === "") {
    layer.msg("Please enter the code of the chatroom you want to join or create!")
  } else {
      axios.post(root + "/chatroom/" + code.value, {
	  "user_id": props.user_id,
	  "room_name": "Chatroom"
      }).then(function (response) {
      if (response.data.status === 0 || response.data.status === 200) {
        window.location.reload()
      } else {
        layer.msg("Cannot join or create the chatroom!")
      }
    })
  }
}

</script>

<template>
    <lay-container>
	<div class="popup-container">
	    <h3>Please enter the code of the chatroom you want to join or create:</h3>
	    <br/>
	    <lay-input v-on:keyup.enter="joinOrCreate" placeholder="Code" v-model="code" :allow-clear="true"/>
	    <br/>
	    <br/>
	    <lay-button type="primary" fluid @click="joinOrCreate">Join/Create</lay-button>
	</div>
    </lay-container>
</template>

<style scoped>
 .popup-container {
     margin-bottom: 1em
 }
</style>
