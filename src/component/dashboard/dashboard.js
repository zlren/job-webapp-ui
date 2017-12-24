import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid, List, NavBar} from 'antd-mobile';

import Boss from '../boss/boss';
import Genius from '../genius/genius';

import NavLinkBar from '../../component/navlink/navlink';

function Msg() {
    return (
        <h2>消息列表</h2>
    );
}

function User() {
    return (
        <h2>个人中心</h2>
    );
}

@connect(state => state, null)
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
                <NavBar className={'fixd-header'} mode={'dark'}>
                    {/*find类似于过滤函数，里面需要有一个返回值为boolean类型的函数，过滤所有的元素找到一个使得返回值为true的元素*/}
                    {navList.find(v => {
                        return pathname === v.path
                    }).text}
                </NavBar>

                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>


                {/*<Route path={'/boss'} component={Boss}/>*/}
                {/*<Route path={'/genius'} component={Genius}/>*/}

                {/*这里我们自己对ant-design的NavBar封装一层，需要给这个子组件传递数据*/}
                <NavLinkBar data={navList}/>
            </div>
        );
    }
}

export default DashBoard;
