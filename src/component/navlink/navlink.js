import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class NavLinkBar extends React.Component {

    static propTypes = {
        mydata: PropTypes.array.isRequired
    };

    render() {

        // data是从父组件传递过来的，根据user类别的不同和hide字段过滤掉跟当前角色不相关的数据
        // filter接收一个函数，如果是大括号就要写函数，写return语句，如果比较简单直接是返回值就可以直接用括号包起来就好了
        const navList = this.props.mydata.filter(v => !v.hide);
        const {pathname} = this.props.location;

        return (
            <TabBar>
                {navList.map(v => (
                        <TabBar.Item
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path)
                            }}
                        />
                    )
                )}
            </TabBar>
        );
    }
}

export default NavLinkBar;
