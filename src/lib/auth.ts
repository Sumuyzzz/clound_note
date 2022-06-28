import request from '@/lib/request';
import { User } from '@/type/type'


const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}





export default {
  register(user: User) {
    return request(URL.REGISTER, 'POST', user)
  },
  login(user: User) {
    return request(URL.LOGIN, 'POST', user)
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo() {
    return request(URL.GET_INFO)
  }
}