import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {loadData} from '../../redux/user.redux';


/**
 *  检测用户信息进行跳转
 *  背后是向服务器发送请求登录状态、用户信息的请求，如果已经登录的话是可以携带cookie的
 *  注意到这里@connect的时候，传递给AuthRoute组件的只有loadData（这是数据），并没有传给它方法
 *  可能是因为这里比较简单，方法直接在组件内部自己给实现了
 */
@withRouter
@connect(null, {loadData})
class AuthRoute extends React.Component {

    componentDidMount() {

        // 这些url是直接可以访问，不需要认证的
        const publicList = ['/login', '/register'];
        const pathName = this.props.location.pathname;
        if (publicList.indexOf(pathName) > -1) {
            return null;
        }

        // 获取用户信息
        // 后端会根据cookie获取登录状态
        // 获取到信息以后通过loadData放到redux中，更新redux.user的各个状态
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 有登录信息
                    console.log('有登陆信息', res);
                    this.props.loadData(res.data.data);
                } else {
                    // 路由组件才会有history属性
                    this.props.history.push('/login');
                }
            }
        })

        // 获取用户信息
        // 是否登录
        // 现在的url地址，login是不需要跳转的


        // 用户的角色
        // 用户是否完善信息（头像、个人简介）

    }

    render() {
        return null;
    }
}

export default AuthRoute;