import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		userInfo: ''
	},
    mutations: {
		getUserInfo (state, val) {
			state.userInfo = val
		}
	},
    actions: {
		
	}
})
export default store