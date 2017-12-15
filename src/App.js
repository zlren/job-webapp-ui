import React from 'react';
import {connect} from 'react-redux';

import {addGun, removeGun, addGunAsync} from './index.redux';

// 本组件需要的数据
const mapStateToProps = (state) => {
    return {num: state.counter} // 这里必须是state.counter，因为state里面有很多的reducer，每个reducer处理一个业务，拿数据的时候要拿本业务的reducer
};

// 本组件需要的方法，自动dispatch
const actionCreators = {addGun, removeGun, addGunAsync};

// 本组件需要的数据和方法
@connect(mapStateToProps, actionCreators)
class App extends React.Component {
    render() {
        return (<div>
            <h2>现在有机枪{this.props.num}把</h2>
            <button onClick={this.props.addGun}>申请武器</button>
            <button onClick={this.props.addGunAsync}>拖两天再申请</button>
            <button onClick={this.props.removeGun}>回收武器</button>
        </div>);
    }
}

export default App;
