import React from 'react';
import './PopupWithForm.css'

function PopupWithForm(props) {
    const isOpen = props.isOpen ? 'popup_show' : '';
    return (
        <div className={`popup popup_show popup_type_${props.name} `+isOpen}>
            <div className="popup__body popup__body-with-form ">
                <button className="button button_role_close" onClick={props.onClose}></button>
                <h3 className="popup__title">{props.title}</h3>
                <form action="#" className="popup__form popup__edit-form" name={`${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="button button_role_submit popup__button" type="submit">{props.submitButtonText}</button>
                </form>
                <p className="popup__or_text">or <a href="/"  onClick={props.or_link}>{props.or_text}</a></p>
            </div>
        </div>
    );
}

export default PopupWithForm;
