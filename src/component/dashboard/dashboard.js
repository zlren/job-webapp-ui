import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar, TabBar} from 'antd-mobile';

import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../../component/user/user';

import NavLinkBar from '../../component/navlink/navlink';

function Msg() {
    return (
        <h2>消息列表</h2>
    );
}

@connect(state => state)
class DashBoard extends React.Component {

    render() {
        const user = this.props.user;
        const {pathname} = this.props.location;

        console.log('user.type是', user.type);

        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            }, {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss'
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            }, {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];

        return (
            <div>
                <NavBar mode={'dark'}>
                    {navList.find(v => pathname === v.path).title}
                </NavBar>


                <div style={{marginTop: 45}}>
                    <Switch>
                        {
                            navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component}/>
                            ))
                        }
                    </Switch>
                </div>

                {/*这里我们自己对ant-design的NavBar封装一层，需要给这个子组件传递数据*/}
                <NavLinkBar mydata={navList}/>
            </div>
        );
    }
}

export default DashBoard;