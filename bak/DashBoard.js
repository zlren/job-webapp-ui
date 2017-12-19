import React from 'react';
import {connect} from 'react-redux';
import {Link, Route, Redirect} from 'react-router-dom';

import App from './App';
import {logout} from "./Auth.redux";

function ErYing() {
    return <h3>二营</h3>;
}

function QiBingLian() {
    return <h3>骑兵连</h3>;
}

@connect(state => state.auth, {logout})
class DashBoard extends React.Component {
    render() {
        const match = this.props.match;
        const redirectToLogin = <Redirect to={'/login'}/>;
        const app =
            (<div>
                <h2>主页</h2>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li>
                        <Link to={`${match.url}`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/erying`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={`${match.url}`} exact component={App}/>
                <Route path={`${match.url}/erying`} exact component={ErYing}/>
                <Route path={`${match.url}/qibinglian`} exact component={QiBingLian}/>
            </div>);

        return this.props.isAuth ? app : redirectToLogin;
    }
}

export default DashBoard;
