import React from 'react';

function InputField(props) {
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
                value={props.value}
                required/>
            <span
                className="popup__input-error popup__input-error_active"
                id={`${props.id}-error`}>
                alsdsmfm dsfnksdn
            </span>
        </>
    );
}

export default InputField;
