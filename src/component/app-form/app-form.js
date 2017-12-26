import React from 'react';

export default function appForm(Comp) {
    return class WrapperComp extends React.Component {

        constructor(props) {
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        /**
         * 这个方法非常通用
         * @param key
         * @param val
         */
        handleChange(key, val) {
            this.setState({
                [key]: val
            })
        }

        render() {
            return (
                // 属性穿透
                <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
            );
        }
    }
}