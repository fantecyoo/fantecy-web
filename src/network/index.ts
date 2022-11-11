import axios from "axios"

export function newMenu(data: any) {
  return axios({
    url: "/api/menu/new-menu",
    method: "post",
    data
  })
}

export function deleteMenu(id: string) {
  return axios({
    url: `/api/menu/delete-menu/${id}`,
    method: "get"
  })
}

export function getMenuList() {
  return axios({
    url: "/api/menu/list",
    method: "get"
  })
}

export function getUserList() {
  return axios({
    url: "/api/users/list",
    method: "get"
  })
}

export function postNewUser(data: any) {
  return axios({
    url: "/api/users/new-user",
    method: "post",
    data
  })
}

export function getUserScore(userId: string) {
  return axios({
    url: `/api/menu/score/${userId}`,
    method: "get"
  })
}

export function updateUserScore(data: any) {
  return axios({
    url: `/api/menu/score`,
    method: "post",
    data
  })
}
