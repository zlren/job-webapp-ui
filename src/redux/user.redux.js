import axios from 'axios';

import {getRedirectPath} from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    user: '',
    pwd: '',
    type: ''
};

// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload),
                isAuth: true,
                msg: ''
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload),
                isAuth: true,
                msg: ''
            };
        case ERROR_MSG:
            // payload里面包含了从后端传来的具体错误信息，key也是msg
            return {...state, msg: action.msg, isAuth: false};
        default:
            return state;
    }
}

// action creator
export function register({user, pwd, repeatPwd, type}) {

    console.log('收到参数:', user, pwd, repeatPwd, type);

    if (!user || !pwd || !type) {
        console.log('用户名和密码必须输入');
        return {type: ERROR_MSG, msg: '用户名和密码必须输入'};
    }

    if (pwd !== repeatPwd) {
        return {type: ERROR_MSG, msg: '两次密码不一致'};
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch({type: REGISTER_SUCCESS, payload: {user, pwd, type}});
            } else {
                dispatch({type: ERROR_MSG, msg: res.data.msg});
            }
        });
    };
}

export function login({user, pwd}) {

    console.log('登录请求', user, pwd);

    if (!user || !pwd) {
        return {type: ERROR_MSG, msg: '参数不完整'};
    }

    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                // 登录成功，返回用户基本信息（不包含敏感信息）
                dispatch({type: LOGIN_SUCCESS, payload: res.data});
            } else {
                // 登录失败，原因后端会传过来
                dispatch({type: ERROR_MSG, msg: res.data.msg});
            }
        })
    }

}
