import React from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {

    static propTypes = {
        // 类型校验，selectAvatar必须是一个必传函数
        selectAvatar: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            'selected': ''
        };
    }

    render() {

        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }));

        const selectedAvatar = this.state.selected ?
            (<div>
                <span>已选择头像</span>
                <img style={{width: 20}} src={this.state.selected} alt={''}/>
            </div>) :
            (<div>请选择头像</div>);

        return (
            <div>
                {/*这是一个通过函数调用来显示头部的属性：renderHeader*/}
                <List renderHeader={() => selectedAvatar}>
                    <Grid data={avatarList} activeStyle={false} columnNum={5} onClick={(avatar) => {

                        // 本组件内部也保存这个状态
                        this.setState({
                            'selected': avatar.icon
                        });

                        // 绑定的点击事件函数是从父组件那里来的，这样就可以传递信息了
                        this.props.selectAvatar(avatar.text);
                    }}/>
                </List>
            </div>
        );
    }
}

export default AvatarSelector;
