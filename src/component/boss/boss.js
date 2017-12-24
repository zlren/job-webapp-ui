import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/chat.redux';

@connect(state => state.chat, {getUserList})
class Boss extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        // 这句话请求完以后，数据存在了state.chat.userList里面了
        // 拿数据的时候就这样：this.props.userList
        this.props.getUserList('genius');
    }

    render() {
        return (
            <div>
                <WhiteSpace/>
                <WingBlank>
                    {this.props.userList.map(v => (
                        // 只显示完善了信息的牛人
                        v.avatar ? (
                            <Card key={v.user}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                />
                                <Card.Body>{v.desc.split('\n').map(vv => (
                                    <div>{vv}</div>
                                ))}
                                </Card.Body>
                            </Card>
                        ) : null
                    ))}
                </WingBlank>
            </div>
        );
    }
}

export default Boss;
