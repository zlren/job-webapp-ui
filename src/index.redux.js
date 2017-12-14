const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

// render
// 根据action执行下一步的动作
export function counter(state = 0, action) {
    // action 是一个对象，其中的type属性是必须的
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10;
    }
}

// action creator
// View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
export function addGun() {
    return {type: ADD_GUN}; // 返回一个action对象，type属性是必须的，这我们是知道的
}

// action
export function removeGun() {
    return {type: REMOVE_GUN};
}

// 这里使用了thunk，可以返回一个函数
export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun())
        }, 2000)
    };
}