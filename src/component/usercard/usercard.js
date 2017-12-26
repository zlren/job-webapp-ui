import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';

/**
 * 求职者或者Boss登录以后可以查看到的信息列表
 * 求职者可以查看boss列表
 * boss可以查看求职者列表
 * 这个列表拿出来单独封装
 */
class UserCard extends React.Component {

    static propTypes = {
        // 本组件所需要展示的数据
        userList: PropTypes.array.isRequired
    };

    render() {
        return (
            <div>
                <WingBlank>
                    {this.props.userList.map(v => (
                        // 只显示完善了信息的牛人
                        v.avatar ? (
                            <div key={v.user}>
                                <WhiteSpace/>
                                <Card>
                                    <Card.Header
                                        title={v.user}
                                        thumb={require(`../img/${v.avatar}.png`)}
                                        extra={<span>{v.title}</span>}
                                    />
                                    <Card.Body>
                                        {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                                        {
                                            v.desc.split('\n').map(vv => (
                                                <div key={Math.random()}>{vv}</div>
                                            ))
                                        }
                                        {v.type === 'boss' ? <div>{v.money}</div> : null}
                                    </Card.Body>
                                </Card>
                            </div>
                        ) : null
                    ))}
                </WingBlank>
            </div>
        );
    }
}

export default UserCard;