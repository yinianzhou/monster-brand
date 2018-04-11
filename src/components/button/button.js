import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style';
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function insertSpace(child) {
    if (isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {},
            child.props.children.split('').join(' '));
    }
    if (isString(child)) {
        if (isTwoCNChar(child)) {
            child = child.split('').join(' ');
        }
        return <span>{child}</span>;
    }
    return child;
}
function isString(str) {
    return typeof str === 'string';
}

export default class Button extends React.Component {
    static defaultProps = {
        prefixCls: 'monster-btn'
    };
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    handleClick = () => {
        this.setState({ clicked: true })
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => this.setState({ clicked: false }), 500);

        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }

    render() {
        const { type, size, className, children, htmlType, prefixCls, ...others } = this.props;
        const { clicked } = this.state;

        let sizeCls = '';
        switch (size) {
            case 'large':
                sizeCls = 'lg';
                break;
            case 'small':
                sizeCls = 'sm';
            default:
                break;
        }

        const ComponentProp = others.href ? 'a' : 'button';
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-clicked`]: clicked,
            [`${prefixCls}-${sizeCls}`]: sizeCls

        });
        const kids = React.Children.map(children, insertSpace);
        return (
            <ComponentProp
                type={others.href ? undefined : (htmlType || 'button')}
                className={classes}
                onClick={this.handleClick}
            >
                {kids}
            </ComponentProp>
        )
    }
}
Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'danger', 'dashed']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    onClick: PropTypes.func,
    className: PropTypes.string
};