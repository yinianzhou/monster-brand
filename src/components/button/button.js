import React from 'react';


export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button type='button'>
                {this.props.children !== undefined ? this.props.children : null}
            </button>
        )
    }
}