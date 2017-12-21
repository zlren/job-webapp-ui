import React from 'react'
import {NavBar, List, InputItem, WingBlank, WhiteSpace, Button, TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import AvatarSelector from '../../component/avatar/avatar-selector';
import {update} from '../../redux/user.redux';


@connect(state => state.user, {update})
class BossInfo extends React.Component {

    constructor(props) {
        super(props);

        // 列出初始状态，表明此组件需要哪些数据，可以让自己更清晰，实际上初始值不写也可以
        this.state = {
            title: '',
            desc: '',
            company: '',
            money: ''
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

                {/*防止已经在bossinfo了还想跳往bossinfo*/}
                {redirectTo != null && redirectTo !== path ? <Redirect to={redirectTo}/> : null}

                <NavBar mode={'dark'}>BOSS信息完善页面</NavBar>

                <AvatarSelector selectAvatar={
                    (avatarText) => {
                        this.handleChange('avatar', avatarText)
                    }
                }/>

                <InputItem onChange={(v) => this.handleChange('title', v)}>招聘职位</InputItem>
                <InputItem onChange={(v) => this.handleChange('company', v)}>公司名称</InputItem>
                <InputItem onChange={(v) => this.handleChange('money', v)}>职位薪资</InputItem>
                <TextareaItem title={'职位要求'} rows={3} autoHeight onChange={(v) => this.handleChange('desc', v)}/>
                <WhiteSpace/>
                <Button type={'primary'} onClick={() => this.props.update(this.state)}>保存</Button>
            </div>
        );
    }
}

export default BossInfo;
