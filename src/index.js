import React from 'react'
import ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import config from './config'; // 加载它使之生效
import reducers from './reducers';
import Auth from './Auth';
import DashBoard from './DashBoard';


// 根据一个函数去创建store，一个应用应该只有一个store
// 一个reducer也许可以，但是系统多了以后会过于复杂，后面应该要reducer的拆分，按业务
const store = createStore(reducers
    , applyMiddleware(thunk)
    //
    // compose(
    //     applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : () => {
    //     }
    // )
);

// class MyTest extends React.Component {
//
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         console.log(this.props);
//         return <h2>404 {this.props.match.params.location}</h2>;
//     }
// }

// 登录
//     没有登录信息，统一跳转login
// 页面   导航+注销
//     一营
//     二营
//     骑兵连

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path={'/login'} component={Auth}/>
                <Route path={'/dashboard'} component={DashBoard}/>
                <Redirect to={'/dashboard'}/>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
