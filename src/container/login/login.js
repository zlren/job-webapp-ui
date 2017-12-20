import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Logo from '../../component/logo/logo'
import {login} from '../../redux/user.redux';
import '../../index.css';

// 登录页面
@connect(state => state.user, {login})
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        };
    }

    register() {
        this.props.history.push('/register');
    }

    handleChange(key, value) {
        this.setState({
                [key]: value
            }
        );
    }

    handleLogin() {
        console.log('准备提交登录', this.state);
        this.props.login(this.state);
    }

    render() {
        return (
            <div>

                {/*登录成功后进行跳转*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}


                <Logo/>

                {/*打印出错信息*/}
                {this.props.msg ? <p className={'errorMsg'}>{this.props.msg}</p> : null}

                <WingBlank>
                    <List>
                        <InputItem onChange={(v) => this.handleChange('user', v)}>账号</InputItem>
                        <InputItem type={'password'} onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
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
