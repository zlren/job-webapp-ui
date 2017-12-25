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

import DashBoard from './component/dashboard/dashboard';

import './index.css'

// 根据一个函数去创建store，一个应用应该只有一个store
// 一个reducer也许可以，但是系统多了以后会过于复杂，后面应该要reducer的拆分，按业务
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// 共有四个页面：boss、genius、me、msg
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>

                {/*Switch组件只要命中了一个，其他的就不管了*/}
                <Switch>
                    <Route path={'/bossinfo'} component={BossInfo}/>
                    <Route path={'/geniusinfo'} component={GeniusInfo}/>

                    <Route path={'/login'} component={Login}/>
                    <Route path={'/register'} component={Register}/>

                    {/*这个Route没有path属性，上面的没有命中的话都会进入下面这个路径*/}
                    {/*用来匹配/boss /genius等界面，这些界面有一个通用的布局，比如上面有header、下面是footer，所以用DashBoard组件再包装一层*/}
                    <Route component={DashBoard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
