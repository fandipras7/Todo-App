import React from "react";
import propTypes from 'prop-types';
import './index.scss'

const Button = ({type, onClick, className, disabled, ...props}) => {
    if(disabled) {
        return (
            <button type={type} onClick={onClick} className="button_disable" disabled={disabled} {...props}>
    
            </button>
        )
    }
    return (
        <button type={type} onClick={onClick} className={className} disabled={disabled} {...props}>

        </button>
    )
}

Button.propTypes = {
    type: propTypes.string,
    onClick: propTypes.func,
    className: propTypes.string
}

Button.defaultProps = {
    className : 'defaultButton'
}

export default Button;