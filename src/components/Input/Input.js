import React from 'react';

function Input(props) {
    return (
        <>
            <input
                className={props.className}
                type={props.type}
                name={props.placeholder}
                placeholder={props.placeholder}
                id={props.id}
                minLength={props.minLength}
                maxLength={props.maxLength}
                onChange={props.handleChange}
                onKeyUp={props.handleKeyUp}
                ref={props.ref}
                formNoValidate={true}/>
            <span
                className={`popup__input-error ${props.errors ? 'popup__input-error_active' : ''}`}>{props.errors}</span>

        </>
    );
}

export default Input;
