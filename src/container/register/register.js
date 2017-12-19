import React from 'react';
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Logo from '../../component/logo/logo'
import {register} from "../../redux/user.redux";
import '../../index.css'


const GENIUS = 'genius';
const BOSS = 'boss';

// 注册页面
@connect(state => state.user, {register})
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: GENIUS // 默认是求职者
        };
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleRegister() {
        this.props.register(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {/*注册完成后进行跳转*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}

                <Logo/>

                <h3>注册页面</h3>

                {/*打印出错信息*/}
                {this.props.msg ? <p className={'errorMsg'}>{this.props.msg}</p> : null}

                <WingBlank>
                    <List>
                        <InputItem onChange={(v) => this.handleChange('user', v)}>账号</InputItem>
                        <InputItem type={'password'} onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
                        <InputItem type={'password'}
                                   onChange={(v) => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem checked={this.state.type === GENIUS}
                                   onChange={() => this.handleChange('type', GENIUS)}>
                            牛人
                        </RadioItem>
                        {/*只有满足checked的条件的时候才会被选中*/}
                        <RadioItem checked={this.state.type === BOSS}
                                   onChange={() => this.handleChange('type', BOSS)}>
                            老板
                        </RadioItem>
                    </List>
                    <WhiteSpace/>

                    <Button type={'primary'} onClick={() => this.handleRegister()}>提交注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register;
