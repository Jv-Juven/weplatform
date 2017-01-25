import * as types from "../mutation-types";

let state = {
    goodsName: "" // 发布物品的名称
}

let mutations = {
    [types.SET_GOODS_NAME] (state, goodsName) {
        state.goodsName = goodsName;
    }
}

let actions = {
    setGoodsName({ commit, state }, goodsName) {
        if (!!goodsName && goodsName.length != 0) {
            commit(types.SET_GOODS_NAME, goodsName);
        }
    }
}

let getters = {
    goodsName: () => {
        return state.goodsName;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
