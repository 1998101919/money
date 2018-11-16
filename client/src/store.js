import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const type = {
  SET_IS_AUTNENTIATED : 'SET_IS_AUTNENTIATED',
  SET_USER : 'SET_USER'
}

const state = {
  isAutnenticated : false,
  user : {}
}

const getters = {
  isAutnenticated : state => state.isAutnenticated,
  user : state => state.user
}

const mutations = {
  [type.SET_IS_AUTNENTIATED](state,isAutnenticated){
    if(isAutnenticated){
      state.isAutnenticated = isAutnenticated;
    }else{
      isAutnenticated = false
    }
  },
  [type.SET_USER](state,user){
    if(user){
      state.user = user;
    }else{
      state.user = {}
    }
  }

}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(type.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(type.SET_USER, user)
  },
  clearUser : ({commit}) => {
    commit(type.SET_IS_AUTNENTIATED,false);
    commit(type.SET_USER,null);
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
