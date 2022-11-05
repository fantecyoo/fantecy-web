<script setup lang="ts">
import { ref,reactive,computed } from 'vue'

// defineProps<{ msg: string }>()
// defineProps({
//   msg:{
//     type:String,
//     required:true,
//     default:'MSG'
//   }
// })

interface Book {
  title:string,
  pages?:number
}

const state = reactive({
  obj:{
    count:1
  }
})

let {obj} = state

obj.count++

console.log(state)

const double = computed<number>(()=>{
  return count.value*2
})

const emit = defineEmits<{
  (e:'change',id:number):void
  (e:'update',value:number):void
}>()
const count = ref<number>(0)

const buttonClick = function(){
  count.value++
  emit('update',count.value)
}

const message = ref('')
</script>

<template>

  <div class="card">
    <button type="button" @click="buttonClick">count is {{ count }}</button>
    <input v-model="message" type="text" />
    <div v-html="message"></div>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
</style>
