<template>
  <div class="header">
    <el-space wrap
              :size="10">
      <el-icon style="position: relative;right:-5px;padding: 7px;">
        <UserFilled />
      </el-icon>
      <el-input v-if="inputVisible"
                ref="InputRef"
                v-model="newUser"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm" />
      <el-button v-else
                 class="button-new-tag ml-1"
                 size="small"
                 @click="showInput">
        + 新用户
      </el-button>
      <el-check-tag :checked="checked(user.userId)"
                    @change="changeUser(user.userId)"
                    v-for="user in userList"
                    :key="user.userId">{{user.username}}</el-check-tag>
    </el-space>
  </div>
  <div class="content">
    <el-space wrap
              :size="20">
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
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from "vue";
import {
  getMenuList,
  getUserList,
  getUserScore,
  updateUserScore,
  postNewUser,
} from "../../network/index";
import { ElInput } from "element-plus";

interface User {
  username: string;
  userId: string;
}

const userList = ref<User[]>([]);

const currentUser = ref<string>("");

interface MenuScore {
  id: string;
  score?: number;
  name: string;
}

const MenuScoreList = ref<MenuScore[]>([]);

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

const inputVisible = ref(false);

const newUser = ref("");

const InputRef = ref<InstanceType<typeof ElInput>>();

const handleInputConfirm = async () => {
  if (newUser.value) {
    const { data: res } = await postNewUser({ username: newUser.value });
    console.log(res);
    if (res.data) {
      userList.value.push({
        username: newUser.value,
        userId: res.data,
      });
    }
  }
  inputVisible.value = false;
  newUser.value = "";
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

created();
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
}
.header {
  margin-bottom: 30px;
}
</style>