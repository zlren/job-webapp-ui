import React from 'react';
import {connect} from 'react-redux';
import {getUserData, login} from './Auth.redux';
import {Redirect} from 'react-router-dom';

// state => state.auth 给出了这个组件所需要的数据，auth默认对应一个reducer的名字，直接props.key中的key就是auth这个state里面的key
@connect(state => state.auth, {getUserData, login})
class Auth extends React.Component {

    // 组件内部调用的时候都是this.props.key的形式调用

    componentDidMount() {
        this.props.getUserData();
    }

    render() {
        return (
            <div>
                <h3>当前用户：{this.props.user}，年龄：{this.props.age}</h3>
                {this.props.isAuth ? <Redirect to={'/dashboard'}/> : null}
                <h2>你没有权限，需要首先登录</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        );
    }
}

export default Auth;
