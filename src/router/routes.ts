import Home from "@c/HelloWorld.vue"
import main from "@v/TimeToLunch/main.vue"
import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/time-to-lunch", component: main }
]

export { routes }
