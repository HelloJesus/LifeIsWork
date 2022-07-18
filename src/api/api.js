import * as axios from "axios"

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "398af949-03b4-4463-8f0f-83ea401764ff"
  }
})

export const usersAPI = {
  // Получаем список пользователей
  getUsers(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response.data
      })
  },
  // Подписка на пользователя
  follow(userId) {
    return instance.post(`follow/${userId}`)
      .then(response => {
        return response.data
      })
  },
  // Отписка от пользователя
  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
      .then(response => {
        return response.data
      })
  }

}

export const profileAPI = {
  // Получаем профиль конкретного юзера
  setUserProfile(userId) {
    return instance.get(`profile/${userId}`)
      .then(response => {
        return response.data
      })
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put('profile/status', { status })
  }
}

export const authAPI = {
  setAuthUserData() {
    return instance.get(`auth/me`)
      .then(response => {
        return response.data
      })
  },
  login(email, password, rememberMe = false) {
    return instance.post(`/auth/login`, { email, password, rememberMe })
      .then(response => {
        return response.data
      })
  },
  logout() {
    return instance.delete(`/auth/login`)
      .then(response => {
        return response.data
      })
  }
}