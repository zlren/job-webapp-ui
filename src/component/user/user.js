import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button, Result} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {logoutSubmit} from '../../redux/user.redux';

@connect(state => state.user, {logoutSubmit})
class User extends React.Component {

    logout() {
        console.log('退出登录');
        sessionStorage.removeItem("TOKEN");
        this.props.logoutSubmit();
    }

    render() {
        return this.props.user ? (
            <div>

                <Result
                    img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt={''}/>}
                    title={this.props.user}
                    message={this.props.type === 'boss' ? this.props.company : null}
                />
                <WhiteSpace/>
                <List renderHeader={() => '简介'}>
                    <List.Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v => (<List.Item.Brief key={v}>{v}</List.Item.Brief>))}
                        {this.props.money ? <List.Item.Brief>薪资：{this.props.money}</List.Item.Brief> : null}
                    </List.Item>
                </List>
                <WhiteSpace/>

                {/*这里有个问题，Button的绑定事件没有处罚，跟DashBoard的TabBar组件有关，去掉底部的TabBar就可以了。。*/}
                <Button type={'primary'} onClick={() => this.logout()}>退出登录</Button>
            </div>
        ) : <Redirect to={this.props.redirectTo}/>;
    }
}

export default User;
