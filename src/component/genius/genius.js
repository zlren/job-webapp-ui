import React from 'react';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/chat.redux';
import UserCard from "../usercard/usercard";

@connect(state => state.chat, {getUserList})
class Genius extends React.Component {

    componentDidMount() {
        // 这句话请求完以后，数据存在了state.chat.userList里面了
        // 拿数据的时候就这样：this.props.userList
        this.props.getUserList('boss');
    }

    render() {
        return (
            <UserCard userList={this.props.userList}/>
        );
    }
}

export default Genius;