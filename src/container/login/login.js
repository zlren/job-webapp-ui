import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Logo from '../../component/logo/logo'
import {login} from '../../redux/user.redux';
import '../../index.css';

import appForm from '../../component/app-form/app-form'

// 登录页面
@connect(state => state.user, {login})
@appForm
class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    register() {
        this.props.history.push('/register');
    }

    handleLogin() {
        console.log('准备提交登录', this.state);
        this.props.login(this.props.state);
    }

    render() {
        return (
            <div>
                {/*登录成功后进行跳转*/}
                {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}/> : null}

                <Logo/>


                {/*打印出错信息*/}
                {this.props.msg ? <p className={'errorMsg'}>{this.props.msg}</p> : null}

                <WingBlank>
                    <List>
                        <InputItem onChange={(v) => this.props.handleChange('user', v)}>账号</InputItem>
                        <InputItem type={'password'} onChange={(v) => this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type={'primary'} onClick={() => this.handleLogin()}>登录</Button>
                    <WhiteSpace/>
                    <Button type={'primary'} onClick={() => this.register()}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;
