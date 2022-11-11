import axios from "axios"

export function newMenu(data: any) {
  return axios({
    url: "/menu/new-menu",
    method: "post",
    data
  })
}

export function deleteMenu(id: string) {
  return axios({
    url: `/menu/delete-menu/${id}`,
    method: "get"
  })
}

export function getMenuList() {
  return axios({
    url: "/menu/list",
    method: "get"
  })
}

export function getUserList() {
  return axios({
    url: "/users/list",
    method: "get"
  })
}

export function postNewUser(data: any) {
  return axios({
    url: "/users/new-user",
    method: "post",
    data
  })
}

export function getUserScore(userId: string) {
  return axios({
    url: `/menu/score/${userId}`,
    method: "get"
  })
}

export function updateUserScore(data: any) {
  return axios({
    url: `/menu/score`,
    method: "post",
    data
  })
}
