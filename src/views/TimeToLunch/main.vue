<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Menu from "./menu.vue";
import User from "./user.vue";
// defineProps<{ msg: string }>()
// defineProps({
//   msg:{
//     type:String,
//     required:true,
//     default:'MSG'
//   }
// })

interface Book {
  title: string;
  pages?: number;
}

const state = reactive({
  obj: {
    count: 1,
  },
});

let { obj } = state;

obj.count++;

console.log(state);

const double = computed<number>(() => {
  return count.value * 2;
});

const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: number): void;
}>();
const count = ref<number>(0);

const buttonClick = function () {
  count.value++;
  emit("update", count.value);
};

const message = ref("");

const activeIndex = ref("1");

function handleSelect(index: "string") {
  activeIndex.value = index;
}
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="1"
               @select="handleSelect"
               class="el-menu-vertical-demo">
        <el-menu-item index="1">菜单</el-menu-item>
        <el-menu-item index="2">打分</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="container">
        <Menu v-if="activeIndex==='1'"></Menu>
        <User v-if="activeIndex==='2'"></User>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.container {
  // display: flex;
  // flex-direction: column;
  height: calc(100vh - 4rem);
  background-color: #f2f5f6;
  padding: 2rem;
}
.box-card {
  width: 100%;
  border-radius: 10px;
}
.el-main {
  padding: 0px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
