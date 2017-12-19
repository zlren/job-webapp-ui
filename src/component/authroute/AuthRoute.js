import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

// 检测用户信息进行跳转
@withRouter
class AuthRoute extends React.Component {

    componentDidMount() {

        // 这些url是直接可以访问，不需要认证的
        const publicList = ['/login', '/register'];
        const pathName = this.props.location.pathname;
        if (publicList.indexOf(pathName) > -1) {
            return null;
        }

        // 获取用户信息
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 有登录信息，什么都不做，直接放过允许访问
                    console.log('有登陆信息')
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