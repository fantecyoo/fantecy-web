<template>
  <div class="header">
    <el-space wrap
              :size="10">
      <!-- <el-check-tag :checked="!currentUser"
                          @change="changeTab">点菜</el-check-tag>
            <el-icon style="position: relative;right:-5px">
              <UserFilled />
            </el-icon>
            <el-check-tag :checked="checked(user.userId)"
                          @change="changeUser(user.userId)"
                          v-for="user in userList"
                          :key="user.userId">{{user.username}}</el-check-tag> -->
    </el-space>
  </div>
  <div class="content">
    <el-space wrap
              :size="20">
      <template v-if="!currentUser">
        <el-card class="box-card"
                 style="height: 100%;"
                 v-for="item in menuList"
                 :key="item.id">
          <div class="menu">
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
      </template>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { getMenuList } from "@n/index";

interface Menu {
  name: string;
  id: string;
  favorUsers: favorUsers[];
  lastTimeOrder: string;
  avgScore: number;
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

created();
</script>

<style scoped lang="scss">
</style>