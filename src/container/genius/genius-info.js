import React from 'react'
import {NavBar, List, InputItem, WingBlank, WhiteSpace, Button, TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import AvatarSelector from '../../component/avatar/avatar-selector';
import {update} from '../../redux/user.redux';


@connect(state => state.user, {update})
class GeniusInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: ''
        };
    }

    handleChange(key, value) {
        this.setState({
                [key]: value
            }
        );
    }

    render() {

        const redirectTo = this.props.redirectTo;
        const path = this.props.location.pathname; // 当前path

        return (
            <div>

                {/*防止已经在geniusinfo了还想跳往geniusinfo*/}
                {redirectTo != null && redirectTo !== path ? <Redirect to={redirectTo}/> : null}

                <NavBar mode={'dark'}>牛人信息完善页面</NavBar>

                <AvatarSelector selectAvatar={(avatarText) => {
                    this.handleChange('avatar', avatarText)
                }}/>

                <InputItem onChange={(v) => this.handleChange('title', v)}>求职岗位</InputItem>

                <TextareaItem title={'个人简介'} rows={3} autoHeight onChange={(v) => this.handleChange('desc', v)}/>
                <WhiteSpace/>
                <Button type={'primary'} onClick={() => this.props.update(this.state)}>保存</Button>
            </div>
        );
    }
}

export default GeniusInfo;
