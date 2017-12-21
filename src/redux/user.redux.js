import axios from 'axios';

import {getRedirectPath} from "../util";

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';


const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
};

// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload),
                msg: ''
            };
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            // payload里面包含了从后端传来的具体错误信息，key也是msg
            return {...state, msg: action.msg, isAuth: false};
        default:
            return state;
    }
}

// action creator
export function register({user, pwd, repeatPwd, type}) {

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
                dispatch({type: AUTH_SUCCESS, payload: {user, pwd, type}});
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
                dispatch({type: AUTH_SUCCESS, payload: res.data.data});
            } else {
                // 登录失败，原因后端会传过来
                dispatch({type: ERROR_MSG, msg: res.data.msg});
            }
        })
    }
}

export function loadData(userinfo) {
    console.log('loadData:', userinfo);
    return {type: LOAD_DATA, payload: userinfo};
}

// 更新个人信息
export function update(info) {
    return dispatch => {
        axios.post('/user/update', info).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({type: AUTH_SUCCESS, payload: res.data.data})
                } else {
                    dispatch({type: ERROR_MSG, msg: res.data.msg});
                }
            }
        )
    }
}







