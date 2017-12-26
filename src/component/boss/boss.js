import React from 'react';
import {connect} from 'react-redux';
import UserCard from '../usercard/usercard';
import {Button} from 'antd-mobile';

import {getUserList} from '../../redux/chat.redux';

@connect(state => state.chat, {getUserList})
class Boss extends React.Component {

    componentDidMount() {
        // 这句话请求完以后，数据存在了state.chat.userList里面了
        // 拿数据的时候就这样：this.props.userList
        this.props.getUserList('genius');
    }

    render() {
        return (
            <div>
                <UserCard userList={this.props.userList}/>
            </div>
        );
    }
}

export default Boss;