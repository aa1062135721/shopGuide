import Vue from 'vue'
import App from './App'
import Api from './utils/Api.js'
import store from './store'
import dayjs from 'dayjs'
import {common} from './utils/common.js'

Vue.config.productionTip = false


Vue.prototype.Api = Api
Vue.prototype.$store = store
Vue.prototype.dayjs = dayjs
Vue.prototype.BaseUrl = common.BaseUrl

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);


const app = new Vue({
    ...App,
	store
})
app.$mount()
