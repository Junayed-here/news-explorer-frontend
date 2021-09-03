import React from 'react';

function SuccessReg(props) {
    const isOpen = props.isOpen ? 'popup_show' : '';
    return (
        <div className={`popup popup_type_${props.name} `+isOpen}>
            <div className="popup__body popup__body-with-form ">
                <button className="button button_role_close" onClick={props.onClose}></button>
                <h3 className="popup__title">Registration successfully completed!</h3>
                <p className="popup__signIn_link" onClick={props.signInClick}>Sign in</p>
            </div>
        </div>
    );
}

export default SuccessReg;
