<template>
  <el-button type="primary"
             style="margin-bottom:10px"
             @click="dialogVisible=true">新建菜单</el-button>
  <div class="content">
    <el-space wrap
              :size="20">
      <el-card class="box-card"
               style="height: 100%;"
               v-for="(item,index) in menuList"
               :key="item.id">
        <div class="menu">
          <el-icon class="delete" @click="handleDeleteMenu(item,index)">
            <Delete />
          </el-icon>
          <div class="title">{{item.name}}</div>
          <el-rate v-model="item.avgScore"
                   allow-half
                   disabled />
          <div class="user">谁吃({{item.favorUsers.length}}):</div>
          <div>
            <el-tag v-for="user in item.favorUsers"
                    :key="user.userId"
                    style="margin-right:5px;margin-bottom: 5px;">{{user.username}}</el-tag>
          </div>
          <div class="">上一次点: {{getLastTimeOrder(item.lastTimeOrder)}}</div>
        </div>
      </el-card>
    </el-space>
  </div>
  <el-dialog v-model="dialogVisible"
             width="30%">
    <el-form label-width="120px"
             label-position="top">
      <el-form-item label="菜单名">
        <el-input v-model="newMenuForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="addMenu">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { getMenuList, newMenu, deleteMenu } from "@n/index";

// 生命周期
created();

interface Menu {
  name: string;
  id: string;
  favorUsers: favorUsers[];
  lastTimeOrder: string;
  avgScore: number;
}

interface User {
  username: string;
  userId: string;
}

interface favorUsers extends User {
  score: number;
}

const currentUser = ref<string>("");
const menuList = ref<Menu[]>([]);

const getLastTimeOrder = function (lastTime: string): string {
  return "两天前";
};

async function created() {
  getMenu();
}

async function getMenu() {
  const { data: res } = await getMenuList();
  console.log(res);
  const data: Menu[] = res.data;
  data.forEach((item) => {
    item.avgScore = item.favorUsers.length
      ? item.favorUsers.reduce((pre, cur) => pre + cur.score, 0) /
        item.favorUsers.length
      : 0;
  });
  menuList.value = data;
}

const dialogVisible = ref(false);
const newMenuForm = ref<any>({});

async function addMenu() {
  const { data: res } = await newMenu(newMenuForm.value);
  dialogVisible.value = false;
  getMenu();
}

async function handleDeleteMenu(item:Menu,index:number) {
   deleteMenu(item.id)
   menuList.value.splice(index,1)
}
</script>

<style scoped lang="scss">
.menu {
  width: 200px;
  & > div {
    margin-bottom: 5px;
  }
  .title {
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &:hover {
    .delete {
      opacity: 1;
    }
  }
}
.delete {
  float: right;
  opacity: 0;
  cursor: pointer;
  &:hover {
    color: red;
    font-weight: bold;
  }
}
</style>