import React from 'react';
import {Link, Route} from 'react-router-dom';

import App from './App';

function ErYing() {
    return <h3>二营</h3>;
}

function QiBingLian() {
    return <h3>骑兵连</h3>;
}

class DashBoard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>DashBoard Page</h2>
                <ul>
                    <li>
                        <Link to={'/dashboard'}>一营</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/erying'}>二营</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/qibinglian'}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={'/dashboard'} exact component={App}/>
                <Route path={'/dashboard/erying'} exact component={ErYing}/>
                <Route path={'/dashboard/qibinglian'} exact component={QiBingLian}/>
            </div>
        );
    }
}

export default DashBoard;
