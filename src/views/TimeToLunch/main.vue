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

const currentUser = ref<string>('')

interface User {
  name: string;
  id:string
}

const userList = ref<User[]>([
  {name:'fantecy',id:'1'},
  {name:'curry',id:'2'},
  {name:'lebron',id:'3'}
])

const changeUser = function(item:string):void{
   currentUser.value = item
}

const checked = function(userId:string):boolean{
  if(currentUser.value==userId){
    return true
  }
  return false
}

interface favorUsers extends User {
  score:number
}

interface Menu {
  name:string;
  id:string;
  favorUsers:favorUsers[];
  lastTimeOrder:string;
  avgScore:number;
}

interface MenuScore {
  id:string;
  score?:number;
  name:string;
}

const MenuScoreList = ref<MenuScore[]>([
  {
    id:'1',
    name:'潇湘阁',
    score:5
  },
  {
    id:'2',
    name:'达美乐披萨',
    score:5
  },
  {
    id:'3',
    name:'姥姥家春饼',
    score:4
  }
])

const menuList = ref<Menu[]>([
  {
    name:'潇湘阁',
    id:'1',
    favorUsers:[
      {name:'fantecy',id:'1',score:5},
      {name:'curry',id:'2',score:4},
      {name:'lebron',id:'3',score:4}
    ],
    lastTimeOrder:'2022-11-01',
    avgScore:5
  },
  {
    name:'达美乐披萨',
    id:'2',
    favorUsers:[
      {name:'fantecy',id:'1',score:5},
      {name:'lebron',id:'3',score:5}
    ],
    lastTimeOrder:'2022-11-02',
    avgScore:5
  },
  {
    name:'姥姥家春饼',
    id:'3',
    favorUsers:[
      {name:'fantecy',id:'1',score:4},
      {name:'curry',id:'2',score:5},
    ],
    lastTimeOrder:'2022-11-03',
    avgScore:4.5
  }
])

const getLastTimeOrder = function(lastTime:string):string{
  return '两天前'
}

const getAvgStar = function(item:Menu):number{
  let all = item.favorUsers.reduce((pre,cur)=>{
    return pre+cur.score
  },0)
  return all/item.favorUsers.length
}

const changeTab = function():void{
  currentUser.value = ''
}

</script>

<template>
  <div class="container">
    <div class="header">
        <el-space wrap :size="10">
          <el-check-tag :checked="!currentUser" @change="changeTab">点菜</el-check-tag>
          <el-icon style="position: relative;right:-5px"><UserFilled /></el-icon>
          <el-check-tag :checked="checked(user.id)" @change="changeUser(user.id)" v-for="user in userList" :key="user.id">{{user.name}}</el-check-tag>
        </el-space>
    </div>
    <div class="content">
      <el-space wrap :size="20">
            <template v-if="!currentUser">
              <el-card class="box-card" style="height: 100%;" v-for="item in menuList" :key="item.id">
                    <div class="menu">
                    <div class="title">{{item.name}}</div>
                    <el-rate v-model="item.avgScore" allow-half disabled/>
                    <div class="user">谁吃({{item.favorUsers.length}}):</div>
                    <div>
                      <el-tag v-for="user in userList" :key="user.id" style="margin-right:5px">{{user.name}}</el-tag>
                    </div>
                    <div class="">上一次点: {{getLastTimeOrder(item.lastTimeOrder)}}</div>
                </div>
              </el-card>
            </template>
            <template v-if="currentUser">
              <el-card class="box-card" style="height: 100%;" v-for="item in MenuScoreList" :key="item.id">
                <div class="menu">
                  <div class="title">{{item.name}}</div>
                  <el-rate v-model="item.score" allow-half clearable />
                </div>
              </el-card>
            </template>
      </el-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4rem);
  background-color: #f2f5f6;
  padding: 2rem
}
.read-the-docs {
  color: #888;
}
.header{
  margin-bottom: 30px;
}
.content{
  flex: 1;
}
.box-card {
  width: 100%;
  border-radius: 10px;
}
.menu{
  width: 200px;
  &>div{
    margin-bottom: 5px;
  }
  .title{
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
