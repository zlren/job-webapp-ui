import React from 'react'
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import config from './config'; // 加载它使之生效
import reducers from './reducers';

// 登录和注册页面
import Login from './container/login/login';
import Register from './container/register/register';

// 完善信息页面
import BossInfo from './container/boss/boss-info';
import GeniusInfo from './container/genius/genius-info';

import AuthRoute from './component/authroute/AuthRoute';

// 根据一个函数去创建store，一个应用应该只有一个store
// 一个reducer也许可以，但是系统多了以后会过于复杂，后面应该要reducer的拆分，按业务
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

function Boss() {
    return (
        <div>
            <h3>boss主页</h3>
        </div>
    );
}

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>

                    <Route path={'/bossinfo'} component={BossInfo}/>
                    <Route path={'/geniusinfo'} component={GeniusInfo}/>

                    <Route path={'/boss'} component={Boss}/>

                    <Route path={'/login'} component={Login}/>
                    <Route path={'/register'} component={Register}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
