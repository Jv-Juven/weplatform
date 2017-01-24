/**
 * 项目结构示例：
 *├── index.html
 *├── main.js
 *├── api
 *│   └── ... # 抽取出API请求
 *├── components
 *│   ├── App.vue
 *│   └── ...
 *└── store
 *    ├── index.js          # 我们组装模块并导出 store 的地方
 *    ├── actions.js        # 根级别的 action
 *    ├── mutations.js      # 根级别的 mutation
 *    └── modules
 *        ├── cart.js       # 购物车模块
 *        └── products.js   # 产品模块
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import issue from './modules/issue';

import * as actions from "./actions";
import * as getters from "./getters";

export default new Vuex.Store({
    getters,
    actions,
    modules: {
        issue
    }
});
