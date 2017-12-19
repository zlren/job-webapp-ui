import axios from 'axios';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_DATA = 'USER_DATA';

const initState = {
    isAuth: false, user: 'zlren', age: 24
};

// 这个reducer会在state中生成一个同名的key，value就是它里面所包含的内容
export function auth(state = initState, action) {
    switch (action.type) {
            case LOGIN:
                return {...state, isAuth: true};
            case LOGOUT:
                return {...state, isAuth: false};
            case USER_DATA:
                return {...state, user: action.payload.user, age: action.payload.age};
            default:
                return state;
    }
}

// 每个actionCreator的必备属性就是type，在对应的reducer中以此区分
// 这个actionCreator和其他的login和logout的区别在哪里呢？这个action是要携带额外获取的数据的，但是数据从哪里来的？使我们自定义的一个函数getUserData
// 所以这里有个参数data，它的作用仅仅是拿到数据以后传给reducer，reducer再去更新状态
export function getUserData() {
    return dispatch => {
        axios.get('/data').then(res => {
            if (res.status === 200) {
                // userData是把结果包装成action的类型
                console.log('哈哈', res.data);
                dispatch({type: USER_DATA, payload: res.data});
            }
        })
    }
}

export function login() {
    return {type: LOGIN};
}

export function logout() {
    return {type: LOGOUT};
}
