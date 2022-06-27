import request from '@/lib/request';

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}


export default {
  register({ URLname,password }) {
    return request(URL.REGISTER,'POST',{URLname,password})
  },
  login({ URLname, password }) {
    return request(URL.LOGIN,'POST',{URLname,password})
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo() {
    return request(URL.GET_INFO)
  }
}