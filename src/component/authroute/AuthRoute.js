import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {loadData} from '../../redux/user.redux';


/**
 *  检测用户信息进行跳转
 *  背后是向服务器发送请求登录状态、用户信息的请求，携带TOKEN
 *  注意到这里@connect的时候，传递给AuthRoute组件的只有loadData（这是数据），并没有传给它方法
 *  可能是因为这里比较简单，方法直接在组件内部自己给实现了
 */
@withRouter
@connect(null, {loadData})
class AuthRoute extends React.Component {

    componentWillMount() {

        // 这些url是直接可以访问，不需要认证的
        const publicList = ['/login', '/register'];
        const pathName = this.props.location.pathname;
        if (publicList.indexOf(pathName) > -1) {
            return null;
        }

        let token = sessionStorage.getItem('TOKEN');

        if (token == null) {
            console.log('请先登录');
            this.props.history.push('/login');
        } else {
            console.log('有TOKEN', token);
        }

        // TODO
        // 获取用户信息
        // 获取到信息以后通过loadData放到redux中，更新redux.user的各个状态
        // BUG 这个请求不是同步的，在请求完成之前，就已经开始在渲染index中<Switch>的组件了，而这里面的组件要用到此次同步的结果，会导致没有数据的异常。。这个问题怎么解决呢
        axios.get('/user/info').then(res => {
            console.log("请求个人信息");
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
    }

    render() {
        return null;
    }
}

export default AuthRoute;