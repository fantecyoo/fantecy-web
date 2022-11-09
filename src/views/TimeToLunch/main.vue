<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import {
  getMenuList,
  getUserList,
  getUserScore,
  updateUserScore,
} from "@n/index";
// defineProps<{ msg: string }>()
// defineProps({
//   msg:{
//     type:String,
//     required:true,
//     default:'MSG'
//   }
// })
async function created() {
  getUser();
}

async function getUser() {
  const { data: res } = await getUserList();
  const data: User[] = res.data.map((item: any) => {
    return {
      username: item.name,
      userId: item.id,
    };
  });
  userList.value = data;
}

created();

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

interface User {
  username: string;
  userId: string;
}

const userList = ref<User[]>();

const changeUser = async function (item: string): Promise<void> {
  currentUser.value = item;
  const { data: res } = await getUserScore(item);
  MenuScoreList.value = res.data;
};

const changeScore = async function (item: MenuScore): Promise<void> {
  updateUserScore({
    menu: item.id,
    user: currentUser.value,
    score: item.score,
  });
};

const checked = function (userId: string): boolean {
  if (currentUser.value == userId) {
    return true;
  }
  return false;
};

interface favorUsers extends User {
  score: number;
}

interface MenuScore {
  id: string;
  score?: number;
  name: string;
}

const MenuScoreList = ref<MenuScore[]>([]);

const getAvgStar = function (item: Menu): number {
  let all = item.favorUsers.reduce((pre, cur) => {
    return pre + cur.score;
  }, 0);
  return all / item.favorUsers.length;
};

const changeTab = function (): void {
  currentUser.value = "";
  getMenu();
};
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="1"
               class="el-menu-vertical-demo">
        <el-menu-item index="1">菜单</el-menu-item>
        <el-menu-item index="2">打分</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="container">
        <div class="header">
          <el-space wrap
                    :size="10">
            <el-check-tag :checked="!currentUser"
                          @change="changeTab">点菜</el-check-tag>
            <el-icon style="position: relative;right:-5px">
              <UserFilled />
            </el-icon>
            <el-check-tag :checked="checked(user.userId)"
                          @change="changeUser(user.userId)"
                          v-for="user in userList"
                          :key="user.userId">{{user.username}}</el-check-tag>
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
            <template v-if="currentUser">
              <el-card class="box-card"
                       style="height: 100%;"
                       v-for="item in MenuScoreList"
                       :key="item.id">
                <div class="menu">
                  <div class="title">{{item.name}}</div>
                  <el-rate v-model="item.score"
                           allow-half
                           clearable
                           @change="()=>changeScore(item)" />
                </div>
              </el-card>
            </template>
          </el-space>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4rem);
  background-color: #f2f5f6;
  padding: 2rem;
}
.read-the-docs {
  color: #888;
}
.header {
  margin-bottom: 30px;
}
.content {
  flex: 1;
}
.box-card {
  width: 100%;
  border-radius: 10px;
}
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
}
.el-main {
  padding: 0px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
